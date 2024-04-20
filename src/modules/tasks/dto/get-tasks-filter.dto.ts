import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// - Models - //
import { TaskStatusEnum } from 'src/shared/models/task-status';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  @ApiProperty({
    name: 'status',
    enum: TaskStatusEnum,
    required: false,
    type: TaskStatusEnum,
  })
  status?: TaskStatusEnum;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
