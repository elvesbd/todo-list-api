import { UseCase } from '@core/shared/interfaces';
import { TodoRepository } from '@core/todo/ports/repository';
import { Injectable, NotFoundException } from '@nestjs/common';

type UpdateTodoNameInput = {
  todoId: string;
  status: boolean;
};

@Injectable()
export class UpdateTodoNameUseCase
  implements UseCase<UpdateTodoNameInput, void>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: UpdateTodoNameInput): Promise<void> {
    const { todoId, status } = input;

    const todo = await this.todoRepository.getById(todoId);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.updateStatus(status);
    await this.todoRepository.save(todo);
  }
}
