import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Public } from '../auth/public.decorator';
import { ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SuperAdminAuthService } from './services/super-admin-auth.service';
import { SuperAdminLoginDto } from '../super-admin/dto/super-admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from '@nestjs/common';

@Controller('auth')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly superAdminAuthService: SuperAdminAuthService,
  ) {}

  @Public()
  @Post('admin')
  @ApiOperation({ summary: 'Authenticate admin' })
  @ApiBody({
    schema: {
      example: { username: 'admin', password: 'password' },
    },
  })
  authenticateAdmin(@Body() adminLoginDto: AdminLoginDto) {
    return this.loginService.validateAdminAuthentication(adminLoginDto);
  }

  @Public()
  @Post('super-admin')
  @ApiOperation({ summary: 'Authenticate super admin' })
  @ApiBody({
    schema: {
      example: { username: 'superadmin', password: 'password' },
    },
  })
  superAdminLogin(@Body() loginDto: SuperAdminLoginDto) {
    return this.superAdminAuthService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout user and invalidate token' })
  @ApiBearerAuth()
  async logout(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.loginService.logout(token);
  }
}
