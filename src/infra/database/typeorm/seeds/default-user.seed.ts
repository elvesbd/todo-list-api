import { dataSource as AppDataSource } from '../datasource';
import { User } from '../entities/user.entity';

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
