import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './sessions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity])
  ],
  controllers: [SessionsController],
  providers: [SessionsService]
})
export class SessionsModule {}
