import { TodosMapper } from "../mappers";
import { HttpClient } from "../utils/HttpClient";
import { CreateTodoDTO, Todo } from "./interfaces";

class TodosService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async getAll(signal?: AbortSignal): Promise<Todo[]> {
    const todos = await this.httpClient.get<Todo[]>(`/todos`, {
      signal,
    });
    return todos.map(TodosMapper.toDomain);
  }

  async getById(todoId: number, signal?: AbortSignal): Promise<Todo> {
    const todoList = await this.httpClient.get<Todo>(`/todos/${todoId}`, {
      signal,
    });
    return TodosMapper.toDomain(todoList);
  }

  async create(todo: CreateTodoDTO): Promise<void> {
    const body = TodosMapper.toPersistence(todo);
    return this.httpClient.post(`/todos`, { body });
  }

  async updateName(todoId: number, newName: string): Promise<void> {
    const body = { name: newName };
    return this.httpClient.put(`/todos/${todoId}`, { body });
  }

  async updateStatus(todoId: number, newStatus: string): Promise<void> {
    const body = { status: newStatus };
    return this.httpClient.put(`/todos/${todoId}`, { body });
  }

  async delete(todoId: number): Promise<void> {
    return this.httpClient.delete(`/todos/${todoId}`);
  }
}

export default new TodosService();
