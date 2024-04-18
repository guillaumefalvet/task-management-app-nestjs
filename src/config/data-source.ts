import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Env } from '../shared/models/env';

config();
const configService = new ConfigService();

export const options: DataSourceOptions & SeederOptions = {
  type: Env.dataBaseType,
  host: configService.getOrThrow(Env.dataBaseHost),
  port: configService.getOrThrow(Env.dataBasePort),
  database: configService.getOrThrow(Env.database),
  username: configService.getOrThrow(Env.dataBaseUsername),
  password: configService.getOrThrow<string>(Env.dataBasePassword),
  entities: [__dirname + '/../modules/**/entities/**.entity.{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  seeds: [join(__dirname, '/../database/seeds/*{.ts,.js}')],
  factories: [join(__dirname, '/../database/factories/**/*{.ts,.js}')],
  synchronize: true,
  logging: true,
};

export const dataSource = new DataSource(options);
