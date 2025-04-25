import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { successResponse, errorResponse } from '../common/utils/response.utils';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  async create(@Body() data: Partial<Role>) {
    try {
      const dataResponse = await this.roleService.create(data);
      return successResponse(dataResponse)
    } catch (error) {
      return errorResponse(error)
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    try {
      const dataResponse = await this.roleService.findAll();
      return successResponse(dataResponse)
    } catch (error) {
      return errorResponse(error)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
