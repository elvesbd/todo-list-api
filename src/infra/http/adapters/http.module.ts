import { Module } from '@nestjs/common';

import {
  SaveTodoUseCase,
  UpdateTodoNameUseCase,
  UpdateTodoStatusUseCase,
} from '@core/todo/usecases';
import {
  SaveTodoController,
  RemoveTodoController,
  UpdateTodoNameController,
  UpdateTodoStatusController,
} from '@infra/http/adapters/controllers/todo';
import { TodoRepository } from '@core/todo/ports/repository';
import { RemoveTodoUseCase } from '@core/todo/usecases/remove';

@Module({
  imports: [],
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
  ],
  controllers: [
    SaveTodoController,
    RemoveTodoController,
    UpdateTodoNameController,
    UpdateTodoStatusController,
  ],
})
export class HttpModule {}
