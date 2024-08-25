import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TodosList } from '@core/todos-list/model';
import { TodosListRepository } from '@core/todos-list/ports/repository';
import { TypeORMTodosListMapper } from '@infra/database/typeorm/mappers';
import { TypeORMTodosListEntity } from '@infra/database/typeorm/entities';
import { dataSource } from '../../datasource';

@Injectable()
export class TypeORMTodosListRepository implements TodosListRepository {
  private repository: Repository<TypeORMTodosListEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMTodosListEntity);
  }

  public async save(todosList: TodosList): Promise<void> {
    const newTodosList = TypeORMTodosListMapper.toPersistence(todosList);
    await this.repository.save(newTodosList);
  }

  public async remove(todosListId: string): Promise<void> {
    const todosList = await this.repository.findOne({
      where: { id: todosListId },
    });

    await this.repository.softRemove(todosList);
  }

  public async getAll(): Promise<TodosList[] | []> {
    const todosList = await this.repository.find();

    return TypeORMTodosListMapper.toDomainList(todosList);
  }

  public async getById(todoId: string): Promise<TodosList | null> {
    const todosList = await this.repository.findOne({
      where: {
        id: todoId,
      },
    });

    if (!todosList) return null;

    return TypeORMTodosListMapper.toDomain(todosList);
  }
}
