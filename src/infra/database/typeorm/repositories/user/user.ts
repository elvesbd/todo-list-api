import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from '@core/auth/model';
import { UserRepository } from '@core/auth/ports';
import { TypeORMUserMapper } from '../../mappers/user.mapper';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async getByEmail(email: string): Promise<User | null> {
    const result = await this.dataSource.query(
      `SELECT * FROM users WHERE id = $`,
      [email],
    );

    if (result.length === 0) return null;

    return TypeORMUserMapper.toDomain(result[0]);
  }
}
