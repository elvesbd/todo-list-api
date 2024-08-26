import { TodosList } from '@core/todos-list/model';

export abstract class TodosListRepository {
  abstract remove(id: string): Promise<void>;
  abstract getAll(): Promise<TodosList[] | []>;
  abstract getById(id: string): Promise<TodosList>;
  abstract save(todoList: TodosList): Promise<void>;
  abstract update(todosList: TodosList): Promise<void>;
}
