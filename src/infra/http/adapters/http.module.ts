import { Module } from '@nestjs/common';

import {
  GetAllTodosListUseCase,
  RemoveTodosListUseCase,
  SaveTodosListUseCase,
  UpdateTodosListUseCase,
} from '@core/todos-list/usecases';

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
  UpdateTodosListController,
} from './controllers/todos-list';
import {
  SaveTodoController,
  RemoveTodoController,
  UpdateTodoNameController,
  UpdateTodoStatusController,
  GetTodosByTodosListController,
} from '@infra/http/adapters/controllers/todo';
import { AuthenticateUseCase } from '@core/auth/usecases';
import { TodoRepository } from '@core/todo/ports/repository';
import { TokenManager, UserRepository } from '@core/auth/ports';
import { DatabaseModule } from '@infra/database/database.module';
import { ProviderModule } from '@infra/providers/provider.module';
import { TodosListRepository } from '@core/todos-list/ports/repository';
import { AuthenticateController } from '@infra/http/adapters/controllers/auth';

@Module({
  imports: [DatabaseModule, ProviderModule],
  providers: [
    {
      provide: AuthenticateUseCase,
      useFactory: (
        tokenManager: TokenManager,
        todoRepository: UserRepository,
      ): AuthenticateUseCase =>
        new AuthenticateUseCase(tokenManager, todoRepository),
      inject: [TokenManager, UserRepository],
    },
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
    {
      provide: UpdateTodosListUseCase,
      useFactory: (
        todosListRepository: TodosListRepository,
      ): UpdateTodosListUseCase =>
        new UpdateTodosListUseCase(todosListRepository),
      inject: [TodosListRepository],
    },
  ],
  controllers: [
    SaveTodoController,
    RemoveTodoController,
    AuthenticateController,
    UpdateTodoNameController,
    UpdateTodoStatusController,
    SaveTodosListController,
    RemoveTodosListController,
    GetAllTodosListController,
    UpdateTodosListController,
    GetTodosByTodosListController,
  ],
})
export class HttpModule {}
