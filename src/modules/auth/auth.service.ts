import { Injectable, ConflictException, NotFoundException, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { SignupDto, SigninDto } from "./dto";
import { UserRO } from '../user/user.dto';
import { UserEntity } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';
// import { SignupDto } from "./auth.dto"

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ){}


    async signup(signupDto: SignupDto):Promise<UserRO>{
        const {username, email} = signupDto;
        const userExists = await this._authRepository
            .findOne({
                where: [{username}, {email}]
            }) 
        
        if(userExists) throw new ConflictException('username o email ya already exists');

        return this._authRepository.signup(signupDto); 
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }>{
        const { username, password } = signinDto;

        const user: UserEntity = await this._authRepository
            .findOne({
                where: {username}, relations: ['roles']
            });

        if(!user) throw new NotFoundException("user does not exist");

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);

        // const payload: IJwtPayload = {
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.id as RoleType)
        }

        const token = await this._jwtService.sign(payload);

        return {token};

    }

}
