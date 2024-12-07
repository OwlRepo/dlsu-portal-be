import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { NotFoundException } from '@nestjs/common';

describe('AdminService', () => {
  let service: AdminService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(Admin),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an admin', async () => {
      const createAdminDto = {
        username: 'testadmin',
        password: 'password123',
        email: 'test@admin.com',
        firstName: 'Test',
        lastName: 'Admin',
        role: 'admin',
      };

      const admin = { id: 1, ...createAdminDto };

      mockRepository.create.mockReturnValue(admin);
      mockRepository.save.mockResolvedValue(admin);

      const result = await service.create(createAdminDto);

      expect(result).toEqual({
        ...admin,
        password: createAdminDto.password,
      });
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createAdminDto,
        adminId: expect.any(String),
        password: expect.any(String),
      });
      expect(mockRepository.save).toHaveBeenCalledWith(admin);
    });
  });

  describe('findAll', () => {
    it('should return an array of admins', async () => {
      const expected = [
        { id: 1, username: 'admin1', password: 'pass1' },
        { id: 2, username: 'admin2', password: 'pass2' },
      ];

      mockRepository.find.mockResolvedValue(expected);

      const result = await service.findAll();

      expect(result).toEqual(expected);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single admin', async () => {
      const expected = { id: 1, username: 'admin1', password: 'pass1' };

      mockRepository.findOne.mockResolvedValue(expected);

      const result = await service.findOne(1);

      expect(result).toEqual(expected);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when admin is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an admin', async () => {
      const updateAdminDto = {
        username: 'updatedadmin',
        password: 'newpassword',
      };

      const existingAdmin = {
        id: 1,
        username: 'oldadmin',
        password: 'oldpassword',
      };

      const updatedAdmin = {
        id: 1,
        ...updateAdminDto,
      };

      mockRepository.findOne.mockResolvedValue(existingAdmin);
      mockRepository.save.mockResolvedValue(updatedAdmin);

      const result = await service.update('ADM-123456789012', updateAdminDto);

      expect(result).toEqual(updatedAdmin);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when admin to update is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('ADM-123456789012', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an admin', async () => {
      const admin = { id: 1, username: 'admin1', password: 'pass1' };

      mockRepository.findOne.mockResolvedValue(admin);
      mockRepository.remove.mockResolvedValue(admin);

      const result = await service.remove('ADM-123456789012');

      expect(result).toEqual({
        success: true,
        message: 'Admin deleted successfully',
      });
      expect(mockRepository.remove).toHaveBeenCalledWith(admin);
    });

    it('should throw NotFoundException when admin to remove is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('ADM-123456789012')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
