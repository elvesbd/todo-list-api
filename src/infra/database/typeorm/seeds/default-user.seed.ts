import { User } from '@core/auth/model';
import { dataSource as AppDataSource } from '../datasource';

const seedDefaultUser = async () => {
  const dataSource = AppDataSource;

  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  const defaultUser = userRepository.create({
    email: 'default@example.com',
    password: 'password',
  });

  await userRepository.save(defaultUser);
  console.log('Default user created!');

  await dataSource.destroy();
};

seedDefaultUser().catch((error) => {
  console.error('Error seeding default user:', error);
  process.exit(1);
});
