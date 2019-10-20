import { Injectable, HttpException, HttpStatus, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, getConnection, In } from 'typeorm';
import { UserRO, UserDTO } from './user.dto';
import { RoleEntity } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly _roleRepository: Repository<RoleEntity>

    ) { }

    async getUser(id: string): Promise<UserRO> {
        if (!id) throw new BadRequestException('id must be sent');

        const user: UserEntity = await this._userRepository.findOne({ where: { id }, relations: ['roles'] })
        if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        return user.toResponseObject();
    }

    async getAll(): Promise<UserRO[]> {
        // const users = await this.userRepository.find({ relations: ['ideas', 'bookmarks'] });
        const users = await this._userRepository.find({ relations: ['roles'] });
        const userDto = users.map(user => user.toResponseObject());
        return userDto;
    }

    async create(userDto: UserDTO): Promise<UserRO> {
        // let arrRolesPrueba: RoleEntity[] = await getConnection().getRepository(RoleEntity)
        // .createQueryBuilder("roles")
        // .where("id IN (:...id)", { id: userDto.roles })
        // .andWhere("is_active = :is_active", { is_active: true })
        // .getRawMany();

        const userExist = await this._userRepository.findOne({
            where: [{ username: userDto.username }, { email: userDto.email }]
        })

        if (userExist) throw new HttpException('username o email already exists', HttpStatus.CONFLICT);

        // Esto es cuando no esta inyectado nuestro repositorio
        // const arrRoles = await getConnection().getRepository(RoleEntity)
        //     .find({
        //         where: { isActive: true, id: In(userDto.roles) }
        //     });

        const arrRoles = await this._roleRepository.find({
            where: { isActive: true, id: In(userDto.roles) }
        })

        if (!arrRoles.length) throw new HttpException(`Not Found role id: [${userDto.roles}] o están inactivos`, HttpStatus.NOT_FOUND);

        const newUser = await this._userRepository.create({ ...userDto, roles: arrRoles }).save();
        return newUser.toResponseObject();
    }

    async update(id: string, userDto: Partial<UserDTO>): Promise<UserRO> {
        let newUserEntity = new UserEntity;
        if (userDto.username) newUserEntity.username = userDto.username;
        if (userDto.email) newUserEntity.email = userDto.email;
        if (userDto.password) newUserEntity.password = userDto.password;
        if (userDto.is_active) newUserEntity.isActive = userDto.is_active;

        if (userDto.roles) {
            const arrRoles = await getConnection().getRepository(RoleEntity)
                .find({
                    where: { isActive: true, id: In(userDto.roles) }
                });

            // Eliminar todas las relaciones entre usuarios y roles
            const result = await getConnection()
                .createQueryBuilder()
                .delete()
                .from("user_roles")
                .where("user_id = :user_id", { user_id: id })
                .execute();

            let newRoles = arrRoles.map((e) => {
                return {
                    user_id: id,
                    role_id: e
                }
            });

            // Add roles
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into("user_roles")
                .values(newRoles)
                .execute();
        }

        // const updateUser = await this._userRepository.update(id, newUserEntity,);
        const updateUser = await this._userRepository.update(id, newUserEntity);

        // return user.toResponseObject();
        const user: UserEntity = await this._userRepository.findOne({ where: { id }, relations: ['roles'] })
        if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        return user.toResponseObject();
    }

    async deleteUser(id: string): Promise<UserRO> {
        // Eliminar usuario funciona
        const userExist = await this._userRepository.findOne(id);
        if (!userExist) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        await this._userRepository.delete({ id });

        return userExist.toResponseObject();
    }

    async bloquearUser(id: string): Promise<boolean> {

        const userExist = await this._userRepository.findOne(id);
        if (!userExist) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        const roles: number[] = [1];

        const arrRoles = await this._roleRepository.findOne(1);
        // {
        // where: { isActive: true, id: In(roles) }
        // where: { isActive: true, id: 1 }
        // }
        // )

        console.log('Roles');
        console.log(arrRoles);

        userExist.isActive = !userExist.isActive;
        // userExist.roles.concat(arrRoles);


        // userExist.roles = userExist.roles + arrRoles;


        // userExist.roles.push(arrRoles);

        await this._userRepository.save(userExist);

        // Funciona para actualizar todos los campos
        // await this._userRepository.update(id, userExist)
        return true;
    }
}