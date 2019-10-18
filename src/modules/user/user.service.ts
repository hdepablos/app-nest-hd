import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, getConnection } from 'typeorm';
import { UserDTO } from './user.dto';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>
    ) { }

    async getUser(id: string): Promise<UserEntity> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }

        const user: UserEntity = await this._userRepository.findOne(id)
        if (!user) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async getAll(): Promise<UserEntity[]> {
        const users: UserEntity[] = await this._userRepository.find();
        return users;
    }

    async create(user: UserEntity): Promise<UserEntity>{
        
        const repo = await getConnection().getRepository(RoleEntity);
        const rolDefault = await repo.findOne({where: { name: 'General' }})
        user.roles = [rolDefault];
        
        const saveUser = await this._userRepository.save(user);

        return saveUser;
    }

    async update(id: string, user: UserEntity): Promise<void>{
        await this._userRepository.update(id, user);
    }

    async delete(id:string): Promise<void>{
        const userExist = await this._userRepository.findOne(id);
        
        if (!userExist) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        await this._userRepository.update(id, {isActive: false})
    }
}