import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  TypeORMTodoRepository,
  TypeORMTodosListRepository,
} from '@infra/database/typeorm/repositories';
import { dataSource } from './typeorm/datasource';
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
      provide: TodoRepository,
      useClass: TypeORMTodoRepository,
    },
    {
      provide: TodosListRepository,
      useClass: TypeORMTodosListRepository,
    },
  ],
  exports: [TodoRepository, TodosListRepository],
})
export class DatabaseModule {}
