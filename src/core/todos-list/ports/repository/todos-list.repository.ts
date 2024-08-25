import { TodosList } from '@core/todos-list/model';

export abstract class TodosListRepository {
  abstract save(todo: TodosList): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract getAll(): Promise<TodosList[] | []>;
  abstract getById(id: string): Promise<TodosList>;
}
