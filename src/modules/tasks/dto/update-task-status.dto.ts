import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../../shared/models/task-status';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty({ enum: TaskStatus, default: 'OPEN' })
  status: TaskStatus;
}
