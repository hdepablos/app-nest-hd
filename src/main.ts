import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = AppModule.port;
  // app.setGlobalPrefix('api');

  await app.listen(port);
  Logger.log(` - Z Server running app-nest-hd on http://localhost:${port} version-1`, 'Inicio')
}

bootstrap();