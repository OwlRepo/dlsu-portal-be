import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
