import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'Random task' })
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty({ default: "Random task's description" })
  readonly description: string;
}
