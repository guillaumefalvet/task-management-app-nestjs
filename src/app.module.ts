import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/env.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
