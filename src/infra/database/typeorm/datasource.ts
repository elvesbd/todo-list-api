import * as path from 'node:path';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export function createDataSource(configService: ConfigService): DataSource {
  return new DataSource({
    type: 'postgres',
    port: 5432,
    host: configService.get<string>('PG_HOST'),
    database: configService.get<string>('PG_DATABASE'),
    username: configService.get<string>('PG_USERNAME'),
    password: configService.get<string>('PG_PASSWORD'),
    entities: [path.join(__dirname, '..', 'typeorm/entities', '*.{ts,js}')],
    migrations: [path.join(__dirname, '..', 'typeorm/migrations', '*.{ts,js}')],
    synchronize: false,
    logging: false,
  });
}
