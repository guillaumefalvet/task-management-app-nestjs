import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Logger,
  Patch,
  Query,
  UseGuards,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

// - Services - //
import { TasksService } from './tasks.service';

// - DTOs - //
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

// - Entities - //
import { Task } from './entities/task.entity';
import { User } from 'src/modules/auth/entities/user.entity';

// - Decorators - //
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';
import { Roles } from '../auth/decorators/get-role.decorator';

// - Models - //
import { Role } from 'src/shared/models/role.enum';

// - Constants - //
import { TASK_ID_PARAM } from 'src/shared/constants/constant-params';

// - Guards - //
import { RoleGuard } from '../auth/guards/role.guard';

// - Constants - //
import {
  API_PATH_TASK_CREATE_PATH,
  API_PATH_TASK_DELETE_PATH,
  API_PATH_TASK_GET_ALL_PATH,
  API_PATH_TASK_GET_BY_ID_PATH,
  API_PATH_TASK_UPDATE_STATUS_PATH,
} from 'src/shared/constants/constant-path';

@Controller()
@ApiTags('tasks')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard(), RoleGuard)
export class TasksController {
  private _logger = new Logger(TasksController.name);
  constructor(private _tasksService: TasksService) {}

  @Get(API_PATH_TASK_GET_ALL_PATH)
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this._logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this._tasksService.getTasks(filterDto, user);
  }

  @Get(API_PATH_TASK_GET_BY_ID_PATH)
  getTaskById(
    @Param(TASK_ID_PARAM, ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this._tasksService.getTaskById(id, user);
  }

  @Post(API_PATH_TASK_CREATE_PATH)
  createTask(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this._logger.verbose(
      `User "${user.username}" creating task. Data ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this._tasksService.createTask(createTaskDto, user);
  }

  @Delete(API_PATH_TASK_DELETE_PATH)
  @Roles(Role.ADMIN)
  deleteTask(
    @Param(TASK_ID_PARAM, ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this._logger.verbose(
      `User "${user.username}" deleting a task. task id: ${id}`,
    );
    return this._tasksService.deleteTask(id, user);
  }

  @Patch(API_PATH_TASK_UPDATE_STATUS_PATH)
  updateTaskStatus(
    @Param(TASK_ID_PARAM, ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this._logger.verbose(
      `User "${
        user.username
      }" updating a task. task id: ${id}, status: ${JSON.stringify(
        updateTaskStatusDto,
      )}`,
    );
    const { status } = updateTaskStatusDto;
    return this._tasksService.updateTaskStatus(id, status, user);
  }
}
