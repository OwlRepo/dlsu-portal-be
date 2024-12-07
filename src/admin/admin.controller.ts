import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':adminId')
  @ApiOperation({ summary: 'Get admin by adminId' })
  findOne(@Param('adminId') adminId: string) {
    return this.adminService.findByAdminId(adminId);
  }

  @Patch(':adminId')
  @ApiOperation({ summary: 'Update admin by adminId' })
  @ApiBody({ type: UpdateAdminDto })
  update(
    @Param('adminId') adminId: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(adminId, updateAdminDto);
  }

  @Delete(':adminId')
  @ApiOperation({ summary: 'Delete admin by adminId' })
  remove(@Param('adminId') adminId: string) {
    return this.adminService.remove(adminId);
  }

  @Patch(':username')
  updateByUsername(
    @Param('username') username: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateByUsername(username, updateAdminDto);
  }
}
