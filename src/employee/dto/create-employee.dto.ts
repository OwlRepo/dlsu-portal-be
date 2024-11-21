import { IsBoolean, IsString } from '@nestjs/class-validator';

export class CreateEmployeeDto {
  @IsString()
  employeeId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  dateCreated: string;

  @IsString()
  dateActivated: string;

  @IsString()
  dateDeactivated: string;
}
