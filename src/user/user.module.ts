import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
// import { Role } from '../role/entities/role.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    // Nếu "Module Role" chưa export "TypeOrmModule" thì thêm entity "Role" vào "TypeOrmModule.forFeature"
    TypeOrmModule.forFeature([
      User,
      // Role
    ]),
    // Nếu "Module Role" đã export "TypeOrmModule" thì sử dụng "Module Role" trực tiếp
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule]
})

export class UserModule { }
