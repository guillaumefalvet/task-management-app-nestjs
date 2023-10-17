import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty()
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  @ApiProperty()
  search?: string;
}
