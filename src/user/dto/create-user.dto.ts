import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

// create-user-dto
export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  avatarUrl: string;
}