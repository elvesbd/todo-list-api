import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDataSource } from './typeorm/datasource';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dataSource = createDataSource(this.configService);
    return dataSource.options;
  }
}
