import { Controller, Get, Body, Patch, Param, Delete, Query, UseGuards, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { UserService } from './user.service';
import { AssignRoleDto, ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { errorResponse, successResponse } from '../common/utils/response.utils';
import { findAllParamDto } from './dto/request-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Tạo mới người dùng' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(
        createUserDto,
      );

      return successResponse({
        message: 'Register Successfully',
      })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(@Query() params: findAllParamDto) {    
    try {
      const data =
        await this.userService.findAll(params);

      return successResponse({
        data,
        message: 'Get Users Successfully',
      })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(
        +id,
      );

      return successResponse({
        data,
        message: 'Get User Successfully',
      })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.update(
        +id,
        updateUserDto,
      );

      return successResponse({
        message: 'User Updated Successfully',
      })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);

      return successResponse({
        message: 'User Deleted Successfully',
      })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  // Đổi mật khẩu
  @ApiOperation({ summary: 'Đổi password' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id/change-password')
  async changePassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    try {
      const { oldPassword, newPassword } = changePasswordDto;
      const dataResponse = await this.userService.changePassword(id, oldPassword, newPassword);

      return successResponse({
        message: dataResponse,
      })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  // Chỉ định role
  @ApiBody({ type: AssignRoleDto })
  @ApiOperation({ summary: 'Chỉ định role cho người dùng' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_USER')
  @Patch(':id/assign-roles')
  async assignRoles(
    @Param('id') id: number,
    @Body('roleIds') roleIds: number[],
  ) {
    try {
      const dataResponse = await this.userService.assignRoles(id, roleIds);

      return successResponse({
        data: dataResponse,
        message: 'Assign Roles Successfully'
      })
    } catch (error) {
      return errorResponse({ error })
    }
  }
}