import { Injectable, NotFoundException } from '@nestjs/common';

import { TodosList } from '@core/todos-list/model';
import { UseCase } from '@core/shared/interfaces';
import { TodosListRepository } from '@core/todos-list/ports/repository';

type Input = {
  id: string;
  name: string;
  color: string;
};

type Output = {
  todosList: TodosList;
};

@Injectable()
export class UpdateTodosListUseCase implements UseCase<Input, Output> {
  constructor(private readonly todosListRepository: TodosListRepository) {}

  async execute(input: Input): Promise<Output> {
    const { id, name, color } = input;

    const todosList = await this.todosListRepository.getById(id);

    if (!todosList) {
      throw new NotFoundException('Todos list not found');
    }

    todosList.update({ name, color });
    if (todosList.containNotifications) {
      return { todosList };
    }

    await this.todosListRepository.update(todosList);
    return { todosList };
  }
}
