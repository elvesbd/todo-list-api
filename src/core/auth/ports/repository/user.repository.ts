import { User } from '@infra/database/typeorm/entities';

export abstract class UserRepository {
  abstract getByEmail(email: string): Promise<User>;
}
