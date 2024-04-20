import { Injectable } from '@nestjs/common';
import { TaskStatusEnum } from '../../shared/models/task-status';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './tasks.repository';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(private _taskEntityRepository: TaskRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this._taskEntityRepository.findAll(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this._taskEntityRepository.findById(id, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this._taskEntityRepository.createTask(createTaskDto, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    return this._taskEntityRepository.deleteById(id, user);
  }

  updateTaskStatus(
    id: string,
    status: TaskStatusEnum,
    user: User,
  ): Promise<Task> {
    return this._taskEntityRepository.updateTaskStatus(id, status, user);
  }
}
