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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/modules/auth/entities/user.entity';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { taskRoute } from 'src/shared/models/routes';
import { TASK_ID_PARAM } from 'src/shared/constants/constant-params';

@Controller(taskRoute.parent)
@ApiTags(taskRoute.parent)
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}
  @Get(taskRoute.getTasks)
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(taskRoute.getTaskById)
  getTaskById(
    @Param(TASK_ID_PARAM) id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post(taskRoute.createTask)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating task. Data ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(taskRoute.deleteTask)
  deleteTask(
    @Param(TASK_ID_PARAM) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a task. task id: ${id}`,
    );
    return this.tasksService.deleteTask(id, user);
  }

  @Patch(taskRoute.updateTaskStatus)
  updateTaskStatus(
    @Param(TASK_ID_PARAM) id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a task. task id: ${id}, status: ${JSON.stringify(
        updateTaskStatusDto,
      )}`,
    );
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
