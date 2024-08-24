import { TodoList } from '@core/todo-list/model/todo-list';

export abstract class TodoListRepository {
  abstract save(todo: TodoList): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract getAll(id: string): Promise<TodoList[]>;
}
