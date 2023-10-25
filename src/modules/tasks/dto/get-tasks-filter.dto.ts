import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
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
