/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  validateLogin(loginDto: LoginDto) {
    return {
      message: 'Login successful',
      token: Math.random().toString(36).substring(2, 15),
    };
  }
}
