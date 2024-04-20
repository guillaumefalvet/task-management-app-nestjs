import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';

// - Models - //
import { Env } from 'src/shared/models/env';
import { User } from 'src/modules/auth/entities/user.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';

// - Seeds - //
import { seedingEntryPoint } from 'src/database/seeds';

config();
const configService = new ConfigService();
// This file is used for seeding
(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: Env.dataBaseType,
    host: configService.getOrThrow<string>(Env.dataBaseHost),
    port: configService.getOrThrow<number>(Env.dataBasePort),
    database: configService.getOrThrow<string>(Env.database),
    username: configService.getOrThrow<string>(Env.dataBaseUsername),
    password: configService.getOrThrow<string>(Env.dataBasePassword),
    entities: [User, Task],
    seeds: seedingEntryPoint,
    factories: [join(__dirname, '/../database/factories/*{.ts,.js}')],
    logging: true,
    seedTracking: true,
  };

  const dataSource = new DataSource(options);
  dataSource.initialize();

  await runSeeders(dataSource);
})();
