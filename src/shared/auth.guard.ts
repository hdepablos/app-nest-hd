import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Configuration } from './../config/config.keys';
import { ConfigService } from './../config/config.service';
import { SessionEntity } from './../modules/sessions/sessions.entity';
import { getConnection, getRepository } from 'typeorm';
import { Util } from './../shared/util';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false;

    const arrAuth = request.headers.authorization.split(' ');
    if (arrAuth[0] !== 'Bearer')
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    const token = arrAuth[1];

    const session = await getConnection().getRepository(SessionEntity);
    const sessionRow = await session.findOne({ token });

    if (!sessionRow) {
      // El usuario no posee el token activo debe retornar como token invalido
      console.log('Token invalido por que se logout');
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    const decode = await this.validateToken(token);
    request.user = decode;

    // Bloquear, si supera el tiempo de inactividad
    // Eliminar la session

    // console.log("session");
    // console.log(sessionRow);

    const minutos = await Util.diffMin(sessionRow.last_request);
    console.log('minutos');
    console.log(minutos);

    if (minutos > 30) {
      this.deleteSession(token);
      throw new HttpException(
        'Bloqueo, limit de tiempo excedido por la ultima petición',
        460,
      );
    }

    // Actualizar
    return true;
  }

  async deleteSession(token: string): Promise<void> {
    const session = await getConnection().getRepository(SessionEntity);
    await session.delete({ token });
  }

  async validateToken(token: string) {
    const config = new ConfigService();
    try {
      const decode = jwt.verify(token, config.get(Configuration.JWT_SECRET));
      return decode;
    } catch (error) {
      const message = `Token error ${error.message || error.name}`;

      // Aqui debemos eliminar la session de base de datos
      console.log('Debe eliminar el registro');

      this.deleteSession(token);

      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
