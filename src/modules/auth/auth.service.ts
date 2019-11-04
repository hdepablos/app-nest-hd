import { Injectable, ConflictException, NotFoundException, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto } from "./dto";
import { UserRO } from '../user/user.dto';
import { UserEntity } from '../user/user.entity';
import { compare } from 'bcryptjs';
// import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';
import { getConnection } from 'typeorm';
import { SessionEntity } from '../sessions/sessions.entity';
import { Util } from './../../shared/util';
// import { SignupDto } from "./auth.dto"

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) { }

    async signup(signupDto: SignupDto): Promise<UserRO> {
        const { username, email } = signupDto;
        const userExists = await this._authRepository
            .findOne({
                where: [{ username }, { email }]
            })

        if (userExists) throw new ConflictException('username o email ya already exists');

        return this._authRepository.signup(signupDto);
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {
        const { username, password } = signinDto;

        const user: UserEntity = await this._authRepository
            .findOne({
                where: { username }, relations: ['roles']
            });

        if (!user) throw new NotFoundException("user does not exist");

        const isMatch = await compare(password, user.password);

        // Verificar el último acceso al sistema        
        const nroDias = await Util.diffDias(user.last_access);

        if (nroDias > 50) throw new HttpException('Excedido limit acceso sin ingresar al sistema', HttpStatus.UNAUTHORIZED);

        if (!isMatch) throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);

        // const payload: IJwtPayload = {
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.id as RoleType)
        }

        // const token = await this._jwtService.verifyAsync(payload);
        const token = await this._jwtService.sign(payload);

        // Incluir el registro de la session
        // this._authRepository

        // Actualizar la fecha del acceso del sistema
        user.last_access = new Date();
        await this._authRepository.save(user);

        // Crear la session en badabase
        const session = await getConnection().getRepository(SessionEntity);
        const newSession = await session.create({
            token,
            usuarioAcceso: 1, // Este nro, debe ser el id usuario_acceso
            last_request: new Date()
        }).save();

        return { token };
    }
}