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
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username must contain only letters, numbers and underscores' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @IsOptional()
  @IsString()
  avatarUrl: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}