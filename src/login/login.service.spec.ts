import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';

describe('LoginService', () => {
  let service: LoginService;

  const mockAdminRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
        {
          provide: getRepositoryToken(Admin),
          useValue: mockAdminRepository,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
