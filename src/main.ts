import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );

  // Lấy biến môi trường bằng ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port ?? 6000);
}
bootstrap();
