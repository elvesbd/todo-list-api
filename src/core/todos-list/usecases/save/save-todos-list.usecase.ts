import { Injectable } from '@nestjs/common';

import { UseCase } from '@core/shared/interfaces';
import { TodosList } from '@core/todos-list/model';
import { TodosListRepository } from '@core/todos-list/ports/repository';

type RegisterTodosListInput = {
  name: string;
  color: string;
};

type SaveTodosListResponse = {
  todosList?: TodosList;
  notifications?: { [key: string]: string[] };
};

@Injectable()
export class SaveTodosListUseCase
  implements UseCase<RegisterTodosListInput, SaveTodosListResponse>
{
  constructor(private readonly todosListRepository: TodosListRepository) {}

  async execute(input: RegisterTodosListInput): Promise<SaveTodosListResponse> {
    const { name, color } = input;
    const todosList = TodosList.create({
      name,
      color,
    });

    if (todosList.containNotifications) {
      return { notifications: todosList.notifications };
    }

    await this.todosListRepository.save(todosList);

    return { todosList };
  }
}
