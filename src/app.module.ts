import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
// import { AuthMiddleware } from './auth/auth.middleware';
// import { AuthMiddlewareRoutes } from './auth/auth.middleware.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Giúp sử dụng biến môi trường ở mọi nơi trong dự án
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        // logging: true,
      }),
    }),

    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get<string>('SECRET_KEY'),
    //     signOptions: { expiresIn: '1d' },
    //   }),
    //   inject: [ConfigService],
    // }),

    UserModule,
    RoleModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'MY_SECRET_KEY',
    //   useFactory: (configService: ConfigService) => configService.get<string>('SECRET_KEY'),
    //   inject: [ConfigService],
    // },
  ],
})
export class AppModule {
  // constructor(private configService: ConfigService) {
  //   const appSecretKey = this.configService.get<number>('SECRET_KEY');
  // }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes(...AuthMiddlewareRoutes);
  // }
}