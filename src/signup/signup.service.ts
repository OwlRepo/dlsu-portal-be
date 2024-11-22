/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    try {
      // Hash password
      const passwordHash = await hash(createUserDto.password, 10);

      // Create new user
      const user = this.usersRepository.create({
        email: createUserDto.email,
        passwordHash,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      });

      // Save user to database
      const savedUser = await this.usersRepository.save(user);

      // Remove passwordHash from response
      const { passwordHash: _, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      throw new BadRequestException('Could not create user');
    }
  }
}
