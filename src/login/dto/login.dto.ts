import { IsNotEmpty } from '@nestjs/class-validator';

import { IsString } from '@nestjs/class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
