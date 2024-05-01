import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// - Models - //
import { TaskStatusEnum } from 'src/shared/models/task-status';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  @ApiProperty({ enum: TaskStatusEnum, default: 'OPEN' })
  readonly status: TaskStatusEnum;
}
