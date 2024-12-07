import { IsBoolean, IsString, IsArray } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @IsString()
  @ApiProperty({ example: 'EMP123' })
  employeeId: string;

  @IsString()
  @ApiProperty({ example: 'john.doe' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  isActive: boolean;

  @IsString()
  @ApiProperty({ example: '2024-03-15' })
  dateCreated: string;

  @IsString()
  @ApiProperty({ example: '2024-03-15' })
  dateActivated: string;

  @IsString()
  @ApiProperty({ example: null })
  dateDeactivated: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['DEVICE123', 'DEVICE456'] })
  deviceId: string[];
}
