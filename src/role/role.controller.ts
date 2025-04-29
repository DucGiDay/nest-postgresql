import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { successResponse, errorResponse } from '../common/utils/response.utils';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: Partial<Role>) {
    try {
      const dataResponse = await this.roleService.create(data);
      return successResponse({ data: dataResponse })
    } catch (error) {
      return errorResponse({ error })
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      const dataResponse = await this.roleService.findAll();
      return successResponse({ data: dataResponse })
    } catch (error) {
      return errorResponse({ error })
    }
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
