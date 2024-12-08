import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Public } from '../auth/public.decorator';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SuperAdminAuthService } from './services/super-admin-auth.service';
import { SuperAdminLoginDto } from '../super-admin/dto/super-admin.dto';

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

  @Post('super-admin')
  superAdminLogin(@Body() loginDto: SuperAdminLoginDto) {
    return this.superAdminAuthService.login(loginDto);
  }
}
