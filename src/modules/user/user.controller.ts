import { Controller, Get, Param, Post, Body, Patch, Delete, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRO } from './user.dto';
import { UserEntity } from './user.entity';
import { ValidationPipe } from './../../shared/validation.pipe';

@Controller('user')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) {}

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserRO> {
        const otra = await this._userService.getUser(id);
        return otra;
    }

    @Get()
    async getAll(): Promise<UserRO[]> {
        const users = this._userService.getAll()
        return users;
    }

    @Post('new')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() user: UserDTO): Promise<UserRO> {
        const createUser = await this._userService.create(user)
        return createUser;
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>): Promise<UserRO>{
        const updateUser = await this._userService.update(id, data)
        return updateUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        await this._userService.delete(id)
        return true;
    }
}