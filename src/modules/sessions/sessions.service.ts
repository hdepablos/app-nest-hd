import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './sessions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly _sessionRepository: Repository<SessionEntity>
    ){}

    async momentRequest(token:string): Promise<boolean>{
        console.log('token');
        console.log(token);
        return true;
    }
}
