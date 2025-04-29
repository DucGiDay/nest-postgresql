import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

// dto kế thừa từ CreateUserDto và chỉ chọn 2 trường 'username', 'password'
export class LoginFormDto extends PickType(CreateUserDto, ['username', 'password'] as const) { }