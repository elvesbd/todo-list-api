import { Module } from '@nestjs/common';

import { TodoRepository } from '@core/todo/ports/repository';
import { UpdateTodoNameUseCase } from '@core/todo/usecases/update-name';
import {
  UpdateTodoNameController,
  UpdateTodoStatusController,
} from '@infra/http/adapters/controllers/todo';
import { UpdateTodoStatusUseCase } from '@core/todo/usecases/update-status';

@Module({
  imports: [],
  providers: [
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
  controllers: [UpdateTodoNameController, UpdateTodoStatusController],
})
export class HttpModule {}
