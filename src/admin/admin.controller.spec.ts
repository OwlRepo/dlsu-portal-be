import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  const mockAdminService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new admin', async () => {
      const createAdminDto = {
        username: 'testadmin',
        password: 'password123',
        email: 'test@admin.com',
        firstName: 'Test',
        lastName: 'Admin',
        role: 'admin',
      };

      mockAdminService.create.mockResolvedValue({
        id: 1,
        ...createAdminDto,
      });

      const result = await controller.create(createAdminDto);

      expect(result).toEqual({
        id: 1,
        ...createAdminDto,
      });
      expect(mockAdminService.create).toHaveBeenCalledWith(createAdminDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of admins', async () => {
      const expected = [
        { id: 1, username: 'admin1', password: 'pass1' },
        { id: 2, username: 'admin2', password: 'pass2' },
      ];

      mockAdminService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(result).toEqual(expected);
      expect(mockAdminService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single admin', async () => {
      const expected = { id: 1, username: 'admin1', password: 'pass1' };

      mockAdminService.findOne.mockResolvedValue(expected);

      const result = await controller.findOne('1');

      expect(result).toEqual(expected);
      expect(mockAdminService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an admin', async () => {
      const updateAdminDto = {
        username: 'updatedadmin',
        password: 'newpassword',
      };

      const expected = {
        id: 1,
        ...updateAdminDto,
      };

      mockAdminService.update.mockResolvedValue(expected);

      const result = await controller.update('1', updateAdminDto);

      expect(result).toEqual(expected);
      expect(mockAdminService.update).toHaveBeenCalledWith(1, updateAdminDto);
    });
  });

  describe('remove', () => {
    it('should remove an admin', async () => {
      const expected = { id: 1, username: 'admin1', password: 'pass1' };

      mockAdminService.remove.mockResolvedValue(expected);

      const result = await controller.remove('1');

      expect(result).toEqual(expected);
      expect(mockAdminService.remove).toHaveBeenCalledWith(1);
    });
  });
});
