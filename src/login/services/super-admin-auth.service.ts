import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SuperAdminService } from '../../super-admin/super-admin.service';
import { SuperAdminLoginDto } from '../../super-admin/dto/super-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperAdminAuthService {
  constructor(
    private superAdminService: SuperAdminService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: SuperAdminLoginDto) {
    const superAdmin = await this.superAdminService.findOneByUsername(
      loginDto.username,
    );

    if (!superAdmin) {
      throw new NotFoundException('Super Admin not found');
    }

    // Log values for debugging
    console.log('Login password:', loginDto.password);
    console.log('Stored hashed password:', superAdmin.password);

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      superAdmin.password.trim(), // Trim any whitespace from stored hash
    );

    console.log('Password valid?', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: superAdmin.id,
      username: superAdmin.username,
      role: 'superadmin',
    };

    return {
      message: 'Admin authentication successful',
      access_token: 'Bearer ' + this.jwtService.sign(payload),
    };
  }
}
