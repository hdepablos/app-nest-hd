import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from "./user.entity";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleEntity } from '../role/role.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UserAccesoEntity } from '../user-acceso/user-acceso.entity';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forFeature([UserEntity, RoleEntity, UserAccesoEntity]), 
        AuthModule
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
