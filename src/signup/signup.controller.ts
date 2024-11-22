import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  signup(@Body() createUserDto: CreateUserDto) {
    return this.signupService.signup(createUserDto);
  }
}
