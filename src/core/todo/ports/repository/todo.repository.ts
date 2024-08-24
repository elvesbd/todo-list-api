import { Todo } from '@core/todo/model/todo';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract getById(id: string): Promise<Todo>;
  abstract updateName(id: string, name: string): Promise<Todo | null>;
  abstract updateStatus(id: string, status: boolean): Promise<Todo | null>;
}
