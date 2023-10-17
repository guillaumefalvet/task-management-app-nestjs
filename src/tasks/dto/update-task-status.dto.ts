import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty()
  status: TaskStatus;
}
