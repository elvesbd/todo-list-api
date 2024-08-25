import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  TypeORMTodoEntity,
  TypeORMTodosListEntity,
} from '@infra/database/typeorm/entities';
import {
  TypeORMTodoRepository,
  TypeORMTodosListRepository,
} from '@infra/database/typeorm/repositories';
import { DatabaseService } from './database.service';
import { TodoRepository } from '@core/todo/ports/repository';
import { TodosListRepository } from '@core/todos-list/ports/repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([TypeORMTodoEntity, TypeORMTodosListEntity]),
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
