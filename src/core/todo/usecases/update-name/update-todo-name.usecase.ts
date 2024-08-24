import { UseCase } from '@core/shared/interfaces';
import { TodoRepository } from '@core/todo/ports/repository';
import { Injectable, NotFoundException } from '@nestjs/common';

type UpdateTodoNameInput = {
  todoId: string;
  name: string;
};

@Injectable()
export class UpdateTodoNameUseCase
  implements UseCase<UpdateTodoNameInput, void>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: UpdateTodoNameInput): Promise<void> {
    const { todoId, name } = input;

    const todo = await this.todoRepository.getById(todoId);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.updateName(name);
    await this.todoRepository.save(todo);
  }
}
