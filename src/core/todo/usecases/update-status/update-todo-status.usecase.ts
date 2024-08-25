import { UseCase } from '@core/shared/interfaces';
import { TodoRepository } from '@core/todo/ports/repository';
import { Injectable, NotFoundException } from '@nestjs/common';

type UpdateTodoStatusInput = {
  id: string;
  status: boolean;
};

@Injectable()
export class UpdateTodoStatusUseCase
  implements UseCase<UpdateTodoStatusInput, void>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: UpdateTodoStatusInput): Promise<void> {
    const { id, status } = input;

    const todo = await this.todoRepository.getById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.updateStatus(status);
    await this.todoRepository.update(todo);
  }
}
