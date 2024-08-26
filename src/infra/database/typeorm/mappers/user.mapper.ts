import { User } from '@core/auth/model';
import { TypeORMUserEntity } from '@infra/database/typeorm/entities';

export class TypeORMUserMapper {
  private constructor() {
    throw new Error(
      'TypeORMUserMapper is a static class and should not be instantiated.',
    );
  }

  public static toDomain(persistence: TypeORMUserEntity): User {
    return new User({
      ...persistence,
      id: String(persistence.id),
    });
  }
}
