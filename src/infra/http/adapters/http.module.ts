import { Module } from '@nestjs/common';

import {
  SaveTodoUseCase,
  UpdateTodoNameUseCase,
  UpdateTodoStatusUseCase,
} from '@core/todo/usecases';
import {
  SaveTodoController,
  UpdateTodoNameController,
  UpdateTodoStatusController,
} from '@infra/http/adapters/controllers/todo';
import { TodoRepository } from '@core/todo/ports/repository';

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
    UpdateTodoNameController,
    UpdateTodoStatusController,
  ],
})
export class HttpModule {}
