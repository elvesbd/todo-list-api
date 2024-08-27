import { User } from '@core/auth/model';

export abstract class UserRepository {
  abstract getByEmail(email: string): Promise<User>;
}
