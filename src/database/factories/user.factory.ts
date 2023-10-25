import { Faker } from '@faker-js/faker';
import { User } from 'src/modules/auth/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';
export default setSeederFactory(User, async (faker: Faker) => {
  const user = new User();
  user.username = faker.person.firstName('male');
  user.password = await bcrypt.hash('admin', 10);
  user.refreshToken = 'seed';

  return user;
});
