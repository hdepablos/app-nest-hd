import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class SigninDto{
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class SignupDto{
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEmail()
    email: string;
}