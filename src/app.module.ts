import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { StudentModule } from './student/student.module';
import { ReportsModule } from './reports/reports.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [EmployeeModule, StudentModule, ReportsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
