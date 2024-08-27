import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  TypeORMTodoRepository,
  TypeORMUserRepository,
  TypeORMTodosListRepository,
} from '@infra/database/typeorm/repositories';
import { dataSource } from './typeorm/datasource';
import { UserRepository } from '@core/auth/ports';
import { DatabaseService } from './database.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TodoRepository } from '@core/todo/ports/repository';
import { TodosListRepository } from '@core/todos-list/ports/repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      dataSourceFactory: async (
        options?: DataSourceOptions,
      ): Promise<DataSource> => {
        if (!options) {
          throw new Error('No DataSource options were provided!');
        }

        return dataSource.initialize();
      },
    }),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeORMUserRepository,
    },
    {
      provide: TodoRepository,
      useClass: TypeORMTodoRepository,
    },
    {
      provide: TodosListRepository,
      useClass: TypeORMTodosListRepository,
    },
  ],
  exports: [UserRepository, TodoRepository, TodosListRepository],
})
export class DatabaseModule {}
