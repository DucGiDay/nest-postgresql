import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { successResponse, errorResponse } from '../common/utils/response.utils';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  async create(@Body() data: Partial<Role>) {
    try {
      const dataResponse = await this.roleService.create(data);
      return successResponse(dataResponse)
    } catch (error) {
      errorResponse(error)
    }
  }

  @Get()
  async findAll() {
    try {
      const dataResponse = await this.roleService.findAll();
      return successResponse(dataResponse)
    } catch (error) {
      errorResponse(error)
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
