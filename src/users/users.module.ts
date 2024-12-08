import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { Admin } from '../admin/entities/admin.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Admin])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
