import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../auth/public.decorator';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post()
  async login(@Body() loginDto: LoginDto) {
    return this.loginService.validateLogin(loginDto);
  }
}
