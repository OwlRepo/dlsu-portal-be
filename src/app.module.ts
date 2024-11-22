import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { StudentModule } from './student/student.module';
import { ReportsModule } from './reports/reports.module';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SignupModule } from './signup/signup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './signup/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'your_password',
      database: 'your_database',
      entities: [User],
      synchronize: true, // Set to false in production
      autoLoadEntities: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    EmployeeModule,
    StudentModule,
    ReportsModule,
    LoginModule,
    SignupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
