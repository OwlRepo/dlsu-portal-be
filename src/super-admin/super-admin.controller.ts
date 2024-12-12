import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { CreateSuperAdminDto } from './dto/super-admin.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('super-admin')
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  @ApiOperation({ summary: 'Register a new super admin' })
  @ApiBody({ type: CreateSuperAdminDto })
  create(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.superAdminService.create(createSuperAdminDto);
  }

  @Post('create-admin')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new admin (Super Admin only)' })
  @ApiBody({ type: CreateAdminDto })
  async createAdmin(@Body() createAdminDto: CreateAdminDto, @Req() req) {
    if (req.user.role !== 'super-admin') {
      throw new ForbiddenException('Only super admins can create new admins');
    }
    return this.superAdminService.createAdmin(createAdminDto);
  }
}
