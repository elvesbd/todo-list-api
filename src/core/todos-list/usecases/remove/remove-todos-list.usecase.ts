import { Injectable, NotFoundException } from '@nestjs/common';

import { UseCase } from '@core/shared/interfaces';
import { TodosListRepository } from '@core/todos-list/ports/repository';

export type RemoveTodosListInput = {
  id: string;
};

@Injectable()
export class RemoveTodosListUseCase
  implements UseCase<RemoveTodosListInput, void>
{
  constructor(private readonly todosListRepository: TodosListRepository) {}

  async execute(input: RemoveTodosListInput): Promise<void> {
    const { id } = input;

    const todo = await this.todosListRepository.getById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todosListRepository.remove(id);
  }
}
