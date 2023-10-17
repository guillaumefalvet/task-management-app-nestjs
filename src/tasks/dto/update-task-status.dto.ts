import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty({ enum: TaskStatus, default: 'OPEN' })
  status: TaskStatus;
}
