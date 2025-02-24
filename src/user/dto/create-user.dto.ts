import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional
} from 'class-validator';

// create-user-dto
export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  avatarUrl: string;
}