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
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { taskUrl } from 'src/shared/models/routes';

// - Constants - //
import { TASK_ID_PARAM } from 'src/shared/constants/constant-params';

@Controller(taskUrl.base)
@ApiTags(taskUrl.base)
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard())
export class TasksController {
  private _logger = new Logger('TasksController');
  constructor(private _tasksService: TasksService) {}
  @Get(taskUrl.getTasks)
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

  @Get(taskUrl.getTaskById)
  getTaskById(
    @Param(TASK_ID_PARAM) id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this._tasksService.getTaskById(id, user);
  }

  @Post(taskUrl.createTask)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this._logger.verbose(
      `User "${user.username}" creating task. Data ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this._tasksService.createTask(createTaskDto, user);
  }

  @Delete(taskUrl.deleteTask)
  deleteTask(
    @Param(TASK_ID_PARAM) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this._logger.verbose(
      `User "${user.username}" deleting a task. task id: ${id}`,
    );
    return this._tasksService.deleteTask(id, user);
  }

  @Patch(taskUrl.updateTaskStatus)
  updateTaskStatus(
    @Param(TASK_ID_PARAM) id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
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
