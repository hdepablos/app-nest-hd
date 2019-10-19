import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
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
        private readonly _userRepository: Repository<UserEntity>
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

        const arrRoles = await getConnection().getRepository(RoleEntity)
            .find({
                where: { isActive: true, id: In(userDto.roles) }
            });
        if (!arrRoles.length) throw new HttpException(`Not Found role id: [${userDto.roles}] o están inactivos`, HttpStatus.NOT_FOUND);

        const newUser = await this._userRepository.create({...userDto, roles: arrRoles}).save();
        return newUser.toResponseObject();
    }

    async update(id: string, data: Partial<UserDTO>): Promise<UserRO> {
        let user = await this._userRepository.findOne({ where: { id }, relations: ['roles'] })
        if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        
        const arrRoles = await getConnection().getRepository(RoleEntity)
            .find({
                where: { isActive: true, id: In(data.roles) }
            });
        if (!arrRoles.length) throw new HttpException(`Not Found role id: [${data.roles}] o están inactivos`, HttpStatus.NOT_FOUND);
        
        // FIXME: pendiente para actualizar considerando 1:N
        // Pendiente ajustar a la relación
        const dataNew = {
            username: data.email
        }
        
        // try {
        // await this._userRepository.update(id, dataNew);
        await this._userRepository.update({id}, dataNew);
        // } catch (error) {
        //     console.log('Error: ***********************************************');

        //     console.log(error);
        // }
        user = await this._userRepository.findOne({ where: { id }, relations: ['roles'] })

        return user.toResponseObject();
    }

    async delete(id: string): Promise<void> {
        const userExist = await this._userRepository.findOne(id);

        if (!userExist) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        await this._userRepository.update(id, { isActive: false })
    }
}