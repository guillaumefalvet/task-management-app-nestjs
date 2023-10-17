import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'Random task' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ default: "Random task's description" })
  description: string;
}
