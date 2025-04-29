import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { errorResponse, successResponse } from 'src/common/utils/response.utils';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginFormDto } from './dto/auth.dto';

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

      return successResponse({
        message: 'Register Successfully',
      })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  @Post('login')
  async login(@Body() data: LoginFormDto) {
    try {
      const dataResponse = await this.authService.login(data);
      return successResponse({ data: dataResponse })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    try {
      const dataResponse = await this.authService.refresh(body.refreshToken);
      return successResponse({ data: dataResponse })
    } catch (error) {
      return errorResponse({ error })
    }
  }
}
