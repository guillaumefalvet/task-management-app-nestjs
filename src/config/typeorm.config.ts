import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// - Models - //
import { Env } from 'src/shared/models/env';

config();
const configService = new ConfigService();
export const options: DataSourceOptions = {
  type: Env.dataBaseType,
  host: configService.getOrThrow<string>(Env.dataBaseHost),
  port: configService.getOrThrow<number>(Env.dataBasePort),
  database: configService.getOrThrow<string>(Env.database),
  username: configService.getOrThrow<string>(Env.dataBaseUsername),
  password: configService.getOrThrow<string>(Env.dataBasePassword),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () => {
    return {
      ...options,
      cli: {
        migrationsDir: __dirname + '/../database/migrations',
      },
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    };
  },
};
export default new DataSource({
  ...options,
  logging: true,
});
