import { Module } from '@nestjs/common';

import { TodoRepository } from '@core/todo/ports/repository';
import { UpdateTodoNameUseCase } from '@core/todo/usecases/update-name';
import { UpdateTodoNameController } from '@infra/http/adapters/controllers/todo';

@Module({
  imports: [],
  providers: [
    {
      provide: UpdateTodoNameUseCase,
      useFactory: (todoRepository: TodoRepository): UpdateTodoNameUseCase =>
        new UpdateTodoNameUseCase(todoRepository),
      inject: [TodoRepository],
    },
  ],
  controllers: [UpdateTodoNameController],
})
export class HttpModule {}
