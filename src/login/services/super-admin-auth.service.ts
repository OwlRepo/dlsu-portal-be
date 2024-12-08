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
    const superAdmin = await this.superAdminService.findOneByEmail(
      loginDto.email,
    );

    if (!superAdmin) {
      throw new NotFoundException('Super Admin not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      superAdmin.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: superAdmin.id,
      email: superAdmin.email,
      role: 'superadmin',
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
