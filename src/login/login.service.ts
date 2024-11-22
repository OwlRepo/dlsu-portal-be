/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  validateLogin(loginDto: LoginDto) {
    const payload = {
      username: loginDto.username,
      sub: 'user123', // typically this would be the user's ID from your database
    };

    return {
      message: 'Login successful',
      access_token: 'Bearer ' + this.jwtService.sign(payload),
    };
  }
}
