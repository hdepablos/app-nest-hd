import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRO } from './user.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) {}

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserEntity> {
        const otra = await this._userService.getUser(id);
        return otra;
    }

    @Get()
    async getAll(): Promise<UserRO[]> {
        const users = await this._userService.getAll()
        return users;
    }

    @Post('new')
    async createUser(@Body() user: UserEntity): Promise<UserEntity> {
        const createUser = await this._userService.create(user)
        return createUser;
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() user: UserEntity){
        const updateUser = await this._userService.update(id, user)
        return true;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        await this._userService.delete(id)
        return true;
    }
}
