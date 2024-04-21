// import {
//   HttpStatus,
//   Injectable,
//   InternalServerErrorException,
//   Logger,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// // - Entities - //
// import { Task } from './entities/task.entity';
// import { User } from 'src/modules/auth/entities/user.entity';

// // - DTOs - //
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// // - Models - //
// import { TaskStatusEnum } from '../../shared/models/task-status';

// @Injectable()
// export class TaskRepository {
//   private _logger = new Logger(TaskRepository.name, { timestamp: true });
//   constructor(
//     @InjectRepository(Task)
//     private readonly _taskEntityRepository: Repository<Task>,
//   ) {}

//   async findById(id: string, user: User): Promise<Task> {
//     const findTask = await this._taskEntityRepository.findOne({
//       where: { id, user },
//     });
//     if (!findTask) {
//       throw new NotFoundException({
//         statusCode: HttpStatus.NOT_FOUND,
//         message: `Task with ID${id} not found`,
//       });
//     }
//     return findTask;
//   }

//   async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
//     const { title, description } = createTaskDto;
//     const task = this._taskEntityRepository.create({
//       title,
//       description,
//       status: TaskStatusEnum.OPEN,
//       user,
//     });
//     const taskCreated = await this._taskEntityRepository.save(task);
//     if (!taskCreated) {
//       throw new InternalServerErrorException({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: 'Failed to create task',
//       });
//     }
//     return taskCreated;
//   }

//   async findAll(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
//     const { status, search } = filterDto;
//     const query = this._taskEntityRepository.createQueryBuilder('task');
//     query.where({ user });
//     if (status) {
//       query.andWhere('task.status = :status', { status });
//     }

//     if (search) {
//       query.andWhere(
//         '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
//         { search: `%${search}%` },
//       );
//     }
//     try {
//       const tasks = await query.getMany();
//       return tasks;
//     } catch (error) {
//       this._logger.error(
//         `Failed to get tasks for user "${
//           user.username
//         }. Filters: ${JSON.stringify(filterDto)}"`,
//         error.stack,
//       );
//       throw new InternalServerErrorException({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: 'Something went wrong',
//       });
//     }
//   }

//   async deleteById(id: string, user: User): Promise<void> {
//     const result = await this._taskEntityRepository.delete({ id, user });
//     if (result.affected === 0) {
//       throw new NotFoundException({
//         statusCode: HttpStatus.NOT_FOUND,
//         message: `Task with ID${id} not found`,
//       });
//     }
//   }

//   async updateTaskStatus(
//     id: string,
//     status: TaskStatusEnum,
//     user: User,
//   ): Promise<Task> {
//     const task = await this.findById(id, user);

//     task.status = status;
//     const saveTask = await this._taskEntityRepository.save(task);
//     if (!saveTask) {
//       throw new InternalServerErrorException({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: 'Failed to update task status',
//       });
//     }
//     return saveTask;
//   }
// }
