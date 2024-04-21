import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// - Modules - //
import { AuthModule } from 'src/modules/auth/auth.module';

// - Entities - //
import { Task } from './entities/task.entity';

// - Controllers - //
import { TasksController } from './tasks.controller';

// - Services - //
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
