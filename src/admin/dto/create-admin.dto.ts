import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'johndoe',
    description: 'The username of the admin',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the admin',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password of the admin',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John',
    description: 'The first name of the admin',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the admin',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'The role of the admin',
  })
  role: string;
}
