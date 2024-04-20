import {
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

// - Entities - //
import { User } from 'src/modules/auth/entities/user.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';

// - Repositories - //
import { TaskRepository } from './tasks.repository';

// - Models - //
import { CreateTaskDto } from './dto/create-task.dto';

// - Models - //
import { TaskStatus } from '../../shared/models/task-status';

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;
  let taskEntityRepository: Repository<Task>;

  beforeEach(() => {
    taskEntityRepository = {} as Repository<Task>;
    taskRepository = new TaskRepository(taskEntityRepository);
  });

  describe('findById', () => {
    it('should return a task with the given id if found', async () => {
      const mockUser: User = {
        id: '1',
        username: 'user1',
        password: 'password',
        refreshToken: 'refreshToken1',
        tasks: [],
      };
      const mockTask: Task = {
        id: '1',
        title: 'Task 1',
        description: 'Description of Task 1',
        status: TaskStatus.OPEN,
        user: mockUser,
      };
      taskEntityRepository.findOne = jest.fn().mockResolvedValue(mockTask);

      const result = await taskRepository.findById('1', mockUser);

      expect(result).toEqual(mockTask);
    });

    xit('should throw NotFoundException if task with given id is not found', async () => {
      const mockUser: User = {
        id: '1',
        username: 'user1',
        password: 'password',
        refreshToken: 'refreshToken1',
        tasks: [],
      };
      taskEntityRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(taskRepository.findById('1', mockUser)).rejects.toThrowError(
        new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Task with ID 1 not found',
        }),
      );
    });
  });

  describe('createTask', () => {
    it('should create a task and return the created task', async () => {
      const mockUser: User = {
        id: '1',
        username: 'user1',
        password: 'password',
        refreshToken: 'refreshToken1',
        tasks: [],
      };
      const createTaskDto: CreateTaskDto = {
        title: 'Task 1',
        description: 'Description of Task 1',
      };
      const mockTask: Task = {
        id: '1',
        ...createTaskDto,
        status: TaskStatus.OPEN,
        user: mockUser,
      };
      taskEntityRepository.create = jest.fn().mockReturnValue(mockTask);
      taskEntityRepository.save = jest.fn().mockResolvedValue(mockTask);

      const result = await taskRepository.createTask(createTaskDto, mockUser);

      expect(result).toEqual(mockTask);
    });

    xit('should throw InternalServerErrorException if failed to create task', async () => {
      const mockUser: User = {
        id: '1',
        username: 'user1',
        password: 'password',
        refreshToken: 'refreshToken1',
        tasks: [],
      };
      const createTaskDto: CreateTaskDto = {
        title: 'Task 1',
        description: 'Description of Task 1',
      };
      taskEntityRepository.create = jest.fn().mockReturnValue(undefined);

      await expect(
        taskRepository.createTask(createTaskDto, mockUser),
      ).rejects.toThrowError(
        new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create task',
        }),
      );
    });
  });

  describe('deleteById', () => {
    it('should delete a task if found', async () => {
      const mockUser: User = {
        id: '1',
        username: 'user1',
        password: 'password',
        refreshToken: 'refreshToken1',
        tasks: [],
      };
      const mockResult = { affected: 1 };
      taskEntityRepository.delete = jest.fn().mockResolvedValue(mockResult);

      await taskRepository.deleteById('1', mockUser);

      expect(taskEntityRepository.delete).toHaveBeenCalledWith({
        id: '1',
        user: mockUser,
      });
    });

    xit('should throw NotFoundException if task with given id is not found', async () => {
      const mockUser: User = {
        id: '1',
        username: 'user1',
        password: 'password',
        refreshToken: 'refreshToken1',
        tasks: [],
      };
      const mockResult = { affected: 0 };
      taskEntityRepository.delete = jest.fn().mockResolvedValue(mockResult);

      await expect(
        taskRepository.deleteById('1', mockUser),
      ).rejects.toThrowError(
        new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Task with ID 1 not found',
        }),
      );
    });
  });

  describe('updateTaskStatus', () => {
    it('should update task status and return the updated task', async () => {
      const mockUser: User = {
        id: '1',
        username: 'user1',
        password: 'password',
        refreshToken: 'refreshToken1',
        tasks: [],
      };
      const mockTask: Task = {
        id: '1',
        title: 'Task 1',
        description: 'Description of Task 1',
        status: TaskStatus.OPEN,
        user: mockUser,
      };
      const updatedStatus = TaskStatus.IN_PROGRESS;
      taskRepository.findById = jest.fn().mockResolvedValue(mockTask);
      taskEntityRepository.save = jest
        .fn()
        .mockResolvedValue({ ...mockTask, status: updatedStatus });

      const result = await taskRepository.updateTaskStatus(
        '1',
        updatedStatus,
        mockUser,
      );

      expect(result).toEqual({ ...mockTask, status: updatedStatus });
    });

    xit('should throw InternalServerErrorException if failed to update task status', async () => {
      const mockUser: User = {
        id: '1',
        username: 'user1',
        password: 'password',
        refreshToken: 'refreshToken1',
        tasks: [],
      };
      taskRepository.findById = jest.fn().mockResolvedValue(undefined);

      await expect(
        taskRepository.updateTaskStatus('1', TaskStatus.IN_PROGRESS, mockUser),
      ).rejects.toThrowError(
        new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update task status',
        }),
      );
    });
  });
});
