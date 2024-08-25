import { Injectable } from '@nestjs/common';

import { TodosList } from '@core/todos-list/model';
import { TodosListRepository } from '@core/todos-list/ports/repository';
import { TypeORMTodosListMapper } from '@infra/database/typeorm/mappers';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeORMTodosListRepository implements TodosListRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async save(todosList: TodosList): Promise<void> {
    const newTodosList = TypeORMTodosListMapper.toPersistence(todosList);

    await this.dataSource.query(
      `INSERT INTO todos_list (id, name, color, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [newTodosList.id, newTodosList.name, newTodosList.color],
    );
  }

  public async remove(id: string): Promise<void> {
    await this.dataSource.query(
      `UPDATE todos SET "deletedAt" = CURRENT_TIMESTAMP WHERE "todosListId" = $1`,
      [id],
    );

    await this.dataSource.query(
      `UPDATE todos_list SET "deletedAt" = CURRENT_TIMESTAMP WHERE id = $1`,
      [id],
    );
  }

  public async getAll(): Promise<TodosList[] | []> {
    const result = await this.dataSource.query(
      `SELECT * FROM todos_list WHERE "deletedAt" IS NULL`,
    );

    return TypeORMTodosListMapper.toDomainList(result);
  }

  public async getById(id: string): Promise<TodosList | null> {
    console.log({ id });

    const result = await this.dataSource.query(
      `SELECT * FROM todos_list WHERE id = $1 AND "deletedAt" IS NULL`,
      [id],
    );

    if (result.length === 0) return null;

    return TypeORMTodosListMapper.toDomain(result[0]);
  }
}
