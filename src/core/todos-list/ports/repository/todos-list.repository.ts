import { TodosList } from '@core/todos-list/model';

export abstract class TodosListRepository {
  abstract getAll(): Promise<TodosList[] | []>;
  abstract save(todoList: TodosList): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract getById(id: string): Promise<TodosList>;
}
