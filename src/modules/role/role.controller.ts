import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe, Patch, Post

} from '@nestjs/common';
import { RoleService } from './role.service';
import { ReadRoleDto } from './dto/read-role.dto';
import { Roles } from './decorators/roles.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles('admins')
  getRoleAll(): Promise<ReadRoleDto[]> {
    return this.roleService.getAll();
  }

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDto> {
    return this.roleService.get(id);
  }

  @Post()
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this.roleService.create(role);
  }

  @Patch(':id')
  updateRole(
    @Param('id', ParseIntPipe) id,
    @Body() role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    return this.roleService.update(id, role);
  }

  @Delete(':id')
  deleteRole(@Param('id') id) {
    return this.roleService.delete(id);
  }

  @Get(':role_id')
  getPermissions(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDto> {
    return this.roleService.get(id);
  }
}
