import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// - Models - //
import { TaskStatus } from 'src/shared/models/task-status';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty({ enum: TaskStatus, default: 'OPEN' })
  status: TaskStatus;
}
