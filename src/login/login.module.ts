import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Admin } from '../admin/entities/admin.entity';
import { SuperAdminModule } from '../super-admin/super-admin.module';
import { SuperAdminAuthService } from './services/super-admin-auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'e34e5367877d04f91c919816b894a331c2a91908eacb36167e5d40f866cb4e1e3f5877a18975698d26ce49ee990e7d26f0c0f840c51e2d4dde56cdbf5e09affb',
      signOptions: { expiresIn: '60m' },
    }),
    SuperAdminModule,
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, SuperAdminAuthService],
  exports: [TypeOrmModule],
})
export class LoginModule {}
