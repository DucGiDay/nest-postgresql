import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) { }
export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'aaa', description: 'Mật khẩu cũ' })
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @ApiProperty({ example: 'aaa', description: 'Mật khẩu mới' })
  newPassword: string;
}
export class AssignRoleDto {
  @ApiProperty({ example: [1, 2, 3], description: 'Danh sách ID của các role' })
  roleIds: number[];
}