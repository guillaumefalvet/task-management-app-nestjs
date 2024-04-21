import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// - Models - //
import { TaskStatusEnum } from '../../shared/models/task-status';

// - DTOs - //
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// - Entities - //
import { Task } from './entities/task.entity';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class TasksService {
  private _logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(Task)
    private readonly _taskEntityRepository: Repository<Task>,
  ) {}

  /**
   * Retrieves tasks based on filter criteria.
   * @param filterDto - The filter criteria.
   * @param user - The user entity.
   * @returns { Promise<Task[]> } A promise resolving to an array of tasks.
   * @throws { InternalServerErrorException } If an unexpected error occurs while retrieving tasks.
   */
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this._taskEntityRepository.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this._logger.error(
        `Failed to get tasks for user "${
          user.username
        }. Filters: ${JSON.stringify(filterDto)}"`,
        error.stack,
      );
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }

  /**
   * Retrieves a task by ID.
   * @param id - The ID of the task.
   * @param user - The user entity.
   * @returns { Promise<Task> } - A promise resolving to the task.
   * @throws { NotFoundException } - If the task with the provided ID is not found.
   * @throws { InternalServerErrorException } - If an unexpected error occurs while retrieving the task.
   */
  async getTaskById(id: string, user: User): Promise<Task> {
    const findTask = await this._taskEntityRepository.findOne({
      where: { id, user },
    });
    if (!findTask) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Task with ID${id} not found`,
      });
    }
    return findTask;
  }
  /**
   * Creates a new task.
   * @param createTaskDto - The data for creating the task.
   * @param user - The user entity.
   * @returns { Promise<Task> } - A promise resolving to the created task.
   * @throws { InternalServerErrorException } If an unexpected error occurs while creating the task.
   */
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this._taskEntityRepository.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
      user,
    });
    const taskCreated = await this._taskEntityRepository.save(task);
    if (!taskCreated) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create task',
      });
    }
    return taskCreated;
  }
  /**
   * Deletes a task by ID.
   * @param id - The ID of the task to delete.
   * @param user - The user entity.
   * @returns { HttpStatus.OK }A promise resolving to void.
   * @throws { NotFoundException } If the task with the provided ID is not found.
   */
  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this._taskEntityRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Task with ID ${id} not found`,
      });
    }
  }
  /**
   * Updates the status of a task.
   * @param id - The ID of the task to update.
   * @param status - The new status of the task.
   * @param user - The user entity.
   * @returns { Promise<Task> } - A promise resolving to the updated task.
   * @throws { NotFoundException } If the task with the provided ID is not found.
   * @throws { InternalServerErrorException } If an unexpected error occurs while updating the task.
   */
  async updateTaskStatus(
    id: string,
    status: TaskStatusEnum,
    user: User,
  ): Promise<Task> {
    const task = await this._taskEntityRepository.findOne({
      where: { id, user },
    });

    task.status = status;
    const saveTask = await this._taskEntityRepository.save(task);
    if (!saveTask) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to update task status',
      });
    }
    return saveTask;
  }
}
