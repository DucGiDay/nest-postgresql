import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter()); // Sử dụng filter để handle lỗi toàn cục

  // Lấy biến môi trường bằng ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port ?? 6000);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
