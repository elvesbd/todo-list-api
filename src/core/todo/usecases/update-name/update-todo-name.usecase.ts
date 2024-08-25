import { UseCase } from '@core/shared/interfaces';
import { Todo } from '@core/todo/model';
import { TodoRepository } from '@core/todo/ports/repository';
import { Injectable, NotFoundException } from '@nestjs/common';

type Input = {
  todoId: string;
  name: string;
};

type Output = {
  todo: Todo;
};

@Injectable()
export class UpdateTodoNameUseCase implements UseCase<Input, Output> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: Input): Promise<Output> {
    const { todoId, name } = input;

    const todo = await this.todoRepository.getById(todoId);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.updateName(name);
    if (todo.containNotifications) {
      return { todo };
    }

    await this.todoRepository.save(todo);
    return { todo };
  }
}
