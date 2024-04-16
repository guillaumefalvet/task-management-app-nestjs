import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { options } from './data-source';
config(); // Load the environment variables from the .env file
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => {
    return {
      ...options,
      cli: {
        migrationsDir: __dirname + '/../database/migrations',
      },
      // autoLoadEntities: true,
      synchronize: true,
      logging: false,
    };
  },
};
// this is used for migrations
// God forgive me for this
export default new DataSource({
  ...options,
});
