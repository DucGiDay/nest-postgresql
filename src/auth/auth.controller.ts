import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBody } from './interface/auth.interface';
import { errorResponse, successResponse } from 'src/common/utils/response.utils';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  async regiser(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.register(
        createUserDto,
      );

      return {
        success: true,
        message: 'Register Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('login')
  async login(@Body() data: LoginBody) {
    try {

      const dataResponse = await this.authService.login(data);
      return successResponse(dataResponse)
    } catch (error) {
      return errorResponse(error)
    }
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    try {
      const dataResponse = await this.authService.refresh(body.refreshToken);
      return successResponse(dataResponse)
    } catch (error) {
      return errorResponse(error)
    }
  }
}
