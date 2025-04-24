import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(
        createUserDto,
      );

      return {
        success: true,
        message: 'User Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    // return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      const data =
        await this.userService.findAll(page, limit);
      return {
        success: true,
        data,
        message: 'Get Users Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(
        +id,
      );
      return {
        success: true,
        data,
        message: 'Get User Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error
      };
    }
  }

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
      return {
        success: true,
        message: 'User Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return {
        success: true,
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id/change-password')
  async changePassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    try {
      const { oldPassword, newPassword } = changePasswordDto;
      const dataResponse = await this.userService.changePassword(id, oldPassword, newPassword);
      return {
        success: true,
        message: dataResponse,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
        error
      };
    }
  }

  @Patch(':id/assign-roles')
  async assignRoles(
    @Param('id') id: number,
    @Body('roleIds') roleIds: number[],
  ) {
    try {
      const dataResponse = await this.userService.assignRoles(id, roleIds);
      return {
        success: true,
        message: dataResponse,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
        error
      };
    }
  }
}
