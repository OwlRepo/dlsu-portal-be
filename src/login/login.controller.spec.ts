import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { AdminLoginDto } from './dto/admin-login.dto';
import { SuperAdminAuthService } from './services/super-admin-auth.service';
import { TokenBlacklistService } from '../auth/token-blacklist.service';

describe('LoginController', () => {
  let controller: LoginController;
  let loginService: LoginService;

  const mockAdminRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockSuperAdminAuthService = {
    validateSuperAdmin: jest.fn(),
  };

  const mockTokenBlacklistService = {
    isTokenBlacklisted: jest.fn(),
    blacklistToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        LoginService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Admin),
          useValue: mockAdminRepository,
        },
        {
          provide: SuperAdminAuthService,
          useValue: mockSuperAdminAuthService,
        },
        {
          provide: TokenBlacklistService,
          useValue: mockTokenBlacklistService,
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('validateAdminAuthentication', () => {
    it('should validate admin authentication with correct parameters', async () => {
      const adminLoginDto: AdminLoginDto = {
        username: 'admin',
        password: 'password123',
      };

      const expectedResult = {
        message: 'Admin authenticated successfully',
        access_token: 'mock_token',
      };

      jest
        .spyOn(loginService, 'validateAdminAuthentication')
        .mockResolvedValue(expectedResult);

      const result = await controller.authenticateAdmin(adminLoginDto);

      expect(loginService.validateAdminAuthentication).toHaveBeenCalledWith(
        adminLoginDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
