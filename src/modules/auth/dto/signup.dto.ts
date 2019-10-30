import { IsNotEmpty, IsString, IsEmail, ArrayNotEmpty } from "class-validator";
import { RoleEntity } from "src/modules/role/role.entity";

export class SignupDto{
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @ArrayNotEmpty()
    roles: RoleEntity[];
}