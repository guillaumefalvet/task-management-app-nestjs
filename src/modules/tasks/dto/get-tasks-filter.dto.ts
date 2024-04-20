import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// - Models - //
import { TaskStatus } from 'src/shared/models/task-status';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    name: 'status',
    enum: TaskStatus,
    required: false,
    type: TaskStatus,
  })
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
