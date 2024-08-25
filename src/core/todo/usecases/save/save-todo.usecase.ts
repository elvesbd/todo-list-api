import { Injectable } from '@nestjs/common';

import { Todo } from '@core/todo/model';
import { UseCase } from '@core/shared/interfaces';
import { TodoRepository } from '@core/todo/ports/repository';

type Input = {
  name: string;
  todosLisId: string;
};

type Output = {
  todo: Todo;
};

@Injectable()
export class SaveTodoUseCase implements UseCase<Input, Output> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: Input): Promise<Output> {
    const { name, todosLisId } = input;
    const todo = Todo.create({ name });

    if (todo.containNotifications) {
      return { todo };
    }

    await this.todoRepository.save(todosLisId, todo);

    return { todo };
  }
}
