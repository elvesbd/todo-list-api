import { Injectable, NotFoundException } from '@nestjs/common';

import { UseCase } from '@core/shared/interfaces';
import { TodoRepository } from '@core/todo/ports/repository';

export type RemoveTodoInput = {
  id: string;
};

@Injectable()
export class RemoveTodoUseCase implements UseCase<RemoveTodoInput, void> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: RemoveTodoInput): Promise<void> {
    const { id } = input;

    const todo = await this.todoRepository.getById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todoRepository.remove(id);
  }
}
