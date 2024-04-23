import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// - Modules - //
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';

// - Config - //
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { envFileValidationSchema } from './config/env.schema';
import { RouterModule } from '@nestjs/core';

// - Models - //
import { AuthUrlEnum, TaskUrlEnum } from './shared/models/routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: envFileValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TasksModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: AuthUrlEnum.base,
            module: AuthModule,
          },
          {
            path: TaskUrlEnum.base,
            module: TasksModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
