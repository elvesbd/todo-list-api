import { Module } from '@nestjs/common';

import {
  SaveTodoUseCase,
  RemoveTodoUseCase,
  UpdateTodoNameUseCase,
  UpdateTodoStatusUseCase,
  GetTodosByTodosListUseCase,
} from '@core/todo/usecases';
import {
  GetAllTodosListController,
  RemoveTodosListController,
  SaveTodosListController,
} from './controllers/todos-list';
import {
  SaveTodoController,
  RemoveTodoController,
  UpdateTodoNameController,
  UpdateTodoStatusController,
  GetTodosByTodosListController,
} from '@infra/http/adapters/controllers/todo';
import { TodoRepository } from '@core/todo/ports/repository';
import { DatabaseModule } from '@infra/database/database.module';
import { SaveTodosListUseCase } from '@core/todos-list/usecases/save';
import { TodosListRepository } from '@core/todos-list/ports/repository';
import { RemoveTodosListUseCase } from '@core/todos-list/usecases/remove';
import { GetAllTodosListUseCase } from '@core/todos-list/usecases/get-all';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: SaveTodoUseCase,
      useFactory: (todoRepository: TodoRepository): SaveTodoUseCase =>
        new SaveTodoUseCase(todoRepository),
      inject: [TodoRepository],
    },
    {
      provide: RemoveTodoUseCase,
      useFactory: (todoRepository: TodoRepository): RemoveTodoUseCase =>
        new RemoveTodoUseCase(todoRepository),
      inject: [TodoRepository],
    },
    {
      provide: UpdateTodoNameUseCase,
      useFactory: (todoRepository: TodoRepository): UpdateTodoNameUseCase =>
        new UpdateTodoNameUseCase(todoRepository),
      inject: [TodoRepository],
    },
    {
      provide: UpdateTodoStatusUseCase,
      useFactory: (todoRepository: TodoRepository): UpdateTodoStatusUseCase =>
        new UpdateTodoStatusUseCase(todoRepository),
      inject: [TodoRepository],
    },
    {
      provide: GetTodosByTodosListUseCase,
      useFactory: (
        todoRepository: TodoRepository,
      ): GetTodosByTodosListUseCase =>
        new GetTodosByTodosListUseCase(todoRepository),
      inject: [TodoRepository],
    },
    {
      provide: SaveTodosListUseCase,
      useFactory: (
        todosListRepository: TodosListRepository,
      ): SaveTodosListUseCase => new SaveTodosListUseCase(todosListRepository),
      inject: [TodosListRepository],
    },
    {
      provide: RemoveTodosListUseCase,
      useFactory: (
        todosListRepository: TodosListRepository,
      ): RemoveTodosListUseCase =>
        new RemoveTodosListUseCase(todosListRepository),
      inject: [TodosListRepository],
    },
    {
      provide: GetAllTodosListUseCase,
      useFactory: (
        todosListRepository: TodosListRepository,
      ): GetAllTodosListUseCase =>
        new GetAllTodosListUseCase(todosListRepository),
      inject: [TodosListRepository],
    },
  ],
  controllers: [
    SaveTodoController,
    RemoveTodoController,
    UpdateTodoNameController,
    UpdateTodoStatusController,
    SaveTodosListController,
    RemoveTodosListController,
    GetAllTodosListController,
    GetTodosByTodosListController,
  ],
})
export class HttpModule {}
