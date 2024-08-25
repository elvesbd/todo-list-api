import { Injectable } from '@nestjs/common';
import { TodoRepository } from '@core/todo/ports/repository';
import { Todo } from '@core/todo/model';

@Injectable()
export class GetTodosByTodosListUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  public async execute(todosListId: string): Promise<Todo[] | []> {
    return await this.todoRepository.getAllByTodosListId(todosListId);
  }
}
