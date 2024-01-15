import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
config();
const configService = new ConfigService();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  database: configService.getOrThrow('DB_DATABASE'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  entities: [__dirname + '/../modules/**/entities/*{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  seeds: [join(__dirname, '/../database/seeds/*{.ts,.js}')],
  factories: [join(__dirname, '/../database/factories/**/*{.ts,.js}')],
  synchronize: true,
  logging: true,
};

export const dataSource = new DataSource(options);
