import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// - Modules - //
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';

// - Config - //
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { envFileValidationSchema } from './config/env.schema';

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
  ],
})
export class AppModule {}
