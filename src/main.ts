import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter()); // Sử dụng filter để handle lỗi toàn cục

  // Bật CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  // Lấy biến môi trường bằng ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  // Thêm tiền tố /api cho tất cả các route
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('API cho ứng dụng Nest-Postgresql')
    .setVersion('1.0')
    // .addTag('tag') // tag tuỳ chọn
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port ?? 8080);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
