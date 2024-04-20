import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';

config();
const configService = new ConfigService();
export const options: DataSourceOptions = {
  type: configService.getOrThrow<string>(EnvEnum.dataBaseType) as any, // need to cast to any because the type is not recognized by TypeORM
  host: configService.getOrThrow<string>(EnvEnum.dataBaseHost),
  port: configService.getOrThrow<number>(EnvEnum.dataBasePort),
  database: configService.getOrThrow<string>(EnvEnum.database),
  username: configService.getOrThrow<string>(EnvEnum.dataBaseUsername),
  password: configService.getOrThrow<string>(EnvEnum.dataBasePassword),
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
