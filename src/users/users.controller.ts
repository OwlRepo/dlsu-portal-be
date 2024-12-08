import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(): Promise<UserDto[]> {
    return this.usersService.getAllUsers();
  }

  @Get('admins')
  @ApiOperation({ summary: 'Get all admin users' })
  async getAdminUsers(): Promise<UserDto[]> {
    return this.usersService.getAdminUsers();
  }

  @Get('employees')
  @ApiOperation({ summary: 'Get all employee users' })
  async getEmployeeUsers(): Promise<UserDto[]> {
    return this.usersService.getEmployeeUsers();
  }
}
