import { Injectable } from '@nestjs/common';

import { UseCase } from '@core/shared/interfaces';
import { TodosList } from '@core/todos-list/model';
import { TodosListRepository } from '@core/todos-list/ports/repository';

@Injectable()
export class GetAllTodosListUseCase implements UseCase<undefined, TodosList[]> {
  constructor(private readonly todosListRepository: TodosListRepository) {}

  async execute(): Promise<TodosList[]> {
    const todosList = await this.todosListRepository.getAll();

    if (!todosList) {
      return [];
    }

    return todosList;
  }
}
