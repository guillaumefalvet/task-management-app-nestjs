import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from 'src/modules/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // uncomment to use factory
    // factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        username: faker.person.firstName('female'),
        password: await bcrypt.hash('admin', 10),
        refreshToken: 'seed',
      },
    ]);

    // ---------------------------------------------------

    // const userFactory = await factoryManager.get(User);
    // // save 1 factory generated entity, to the database
    // await userFactory.save();
    // await userFactory.saveMany(5);
  }
}
