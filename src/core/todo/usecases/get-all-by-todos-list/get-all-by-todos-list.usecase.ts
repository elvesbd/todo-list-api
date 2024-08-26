import { Injectable } from '@nestjs/common';

import { Todo } from '@core/todo/model';
import { TodoRepository } from '@core/todo/ports/repository';

@Injectable()
export class GetTodosByTodosListUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  public async execute(todosListId: string): Promise<Todo[] | []> {
    return await this.todoRepository.getAllByTodosListId(todosListId);
  }
}
