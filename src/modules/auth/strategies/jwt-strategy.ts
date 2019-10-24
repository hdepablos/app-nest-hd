import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from "passport-strategy";
import { ExtractJwt } from "passport-jwt";
import { ConfigService } from "./../../../config/config.service";
import { Configuration } from "./../../../config/config.keys";
import { IJwtPayload } from "../jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRepository } from "../auth.repository";
import { UnauthorizedException, Injectable } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myJwt'){
    
    constructor(
        private readonly _configService: ConfigService,

        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrkey: _configService.get(Configuration.JWT_SECRET)
        })
    }

    async validate(payload: IJwtPayload){
        const {username} = payload;
        const user = await this._authRepository.findOne({
            where: { 
                username, isActive: true 
            }
        });

        if(!user) throw new UnauthorizedException();

        return payload;
    }
}