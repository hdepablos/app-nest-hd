import { Module } from '@nestjs/common';
import { UserAccesoController } from './user-acceso.controller';
import { UserAccesoService } from './user-acceso.service';

@Module({
  controllers: [UserAccesoController],
  providers: [UserAccesoService]
})
export class UserAccesoModule {}
