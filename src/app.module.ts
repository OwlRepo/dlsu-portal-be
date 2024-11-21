import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { StudentModule } from './student/student.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [EmployeeModule, StudentModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
