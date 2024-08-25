import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Todo } from '@core/todo/model';
import { TodoRepository } from '@core/todo/ports/repository';
import { TypeORMTodoMapper } from '@infra/database/typeorm/mappers';

@Injectable()
export class TypeORMTodoRepository implements TodoRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public async save(todosListId: string, todo: Todo): Promise<void> {
    const todoEntity = TypeORMTodoMapper.toPersistence(todo);

    await this.dataSource.query(
      `INSERT INTO todos (id, name, status, "todosListId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [todoEntity.id, todoEntity.name, todoEntity.status, todosListId],
    );
  }

  public async update(todo: Todo): Promise<void> {
    const todoEntity = TypeORMTodoMapper.toPersistence(todo);

    await this.dataSource.query(
      `UPDATE todos SET name = $1, status = $2, "updatedAt" = CURRENT_TIMESTAMP WHERE id = $3`,
      [todoEntity.name, todoEntity.status, todoEntity.id],
    );
  }

  public async remove(id: string): Promise<void> {
    await this.dataSource.query(
      `UPDATE todos SET "deletedAt" = CURRENT_TIMESTAMP WHERE id = $1`,
      [id],
    );
  }

  public async getById(id: string): Promise<Todo | null> {
    const result = await this.dataSource.query(
      `SELECT * FROM todos WHERE id = $1 AND "deletedAt" IS NULL`,
      [id],
    );

    if (result.length === 0) return null;

    return TypeORMTodoMapper.toDomain(result[0]);
  }

  public async getAllByTodosListId(todosListId: string): Promise<Todo[]> {
    const todos = await this.dataSource.query(
      `SELECT * FROM todos WHERE "todosListId" = $1 AND "deletedAt" IS NULL`,
      [todosListId],
    );

    return TypeORMTodoMapper.toDomainList(todos);
  }
}
