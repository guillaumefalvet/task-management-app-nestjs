import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';
import { User } from 'src/modules/auth/entities/user.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';

// - Seeds - //
import { seedingEntryPoint } from 'src/database/seeds';

config();
const configService = new ConfigService();
// This file is used for seeding
(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: configService.getOrThrow<string>(EnvEnum.dataBaseType) as any, // need to cast to any because the type is not recognized by TypeORM
    host: configService.getOrThrow<string>(EnvEnum.dataBaseHost),
    port: configService.getOrThrow<number>(EnvEnum.dataBasePort),
    database: configService.getOrThrow<string>(EnvEnum.database),
    username: configService.getOrThrow<string>(EnvEnum.dataBaseUsername),
    password: configService.getOrThrow<string>(EnvEnum.dataBasePassword),
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
