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
  @ApiBody({
    type: CreateAdminDto,
    examples: {
      admin: {
        value: {
          username: 'johndoe',
          email: 'john.doe@example.com',
          password: 'strongPassword123',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin',
        },
      },
    },
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin by id' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin by id' })
  @ApiBody({
    type: UpdateAdminDto,
    examples: {
      admin: {
        value: {
          email: 'new.email@example.com',
          firstName: 'Updated',
          lastName: 'Name',
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin by id' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
