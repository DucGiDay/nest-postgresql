import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

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

    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APP_PORT',
    //   useFactory: (configService: ConfigService) => configService.get<number>('PORT'),
    //   inject: [ConfigService],
    // },
  ],
})
export class AppModule {
  // constructor(private configService: ConfigService) {
  //   const appPort = this.configService.get<number>('PORT');
  //   console.log(`Application is running on port: ${appPort}`);
  // }
}