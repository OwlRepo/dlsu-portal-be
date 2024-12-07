import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Public } from '../auth/public.decorator';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

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
}
