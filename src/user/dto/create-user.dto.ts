import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Matches,
  MinLength
} from 'class-validator';

// create-user-dto
export class CreateUserDto {
  @ApiProperty({ example: 'aaa' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: 'aaa@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'aaa' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username must contain only letters, numbers and underscores' })
  username: string;

  @ApiProperty({ example: 'aaa' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Danh sách ID của các role' })
  @IsOptional()
  roleIds: number[];

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}