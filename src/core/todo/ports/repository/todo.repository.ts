import { Todo } from '@core/todo/model/todo';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract getById(id: string): Promise<Todo>;
}
