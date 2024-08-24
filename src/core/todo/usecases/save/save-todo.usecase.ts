import { Injectable } from '@nestjs/common';

import { Todo } from '@core/todo/model/todo';
import { UseCase } from '@core/shared/interfaces';
import { TodoRepository } from '@core/todo/ports/repository';

type RegisterTodoInput = {
  name: string;
  status: boolean;
};

type SaveTodoResponse = {
  todo?: Todo;
  notifications?: { [key: string]: string[] };
};

@Injectable()
export class SaveTodoUseCase
  implements UseCase<RegisterTodoInput, SaveTodoResponse>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: RegisterTodoInput): Promise<SaveTodoResponse> {
    const { name, status } = input;
    const todo = Todo.create({
      name,
      status,
    });

    if (todo.containNotifications) {
      return { notifications: todo.notifications };
    }

    await this.todoRepository.save(todo);

    return { todo };
  }
}
