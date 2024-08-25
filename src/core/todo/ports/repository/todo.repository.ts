import { Todo } from '@core/todo/model/todo';

export abstract class TodoRepository {
  abstract remove(id: string): Promise<void>;
  abstract update(todo: Todo): Promise<void>;
  abstract getById(id: string): Promise<Todo>;
  abstract save(todosLisId: string, todo: Todo): Promise<void>;
  abstract getAllByTodosListId(todosLisId: string): Promise<Todo[] | []>;
}
