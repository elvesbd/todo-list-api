import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Todo } from '@core/todo/model';
import { TodoRepository } from '@core/todo/ports/repository';
import { TypeORMTodoEntity } from '@infra/database/typeorm/entities';
import { TypeORMTodoMapper } from '@infra/database/typeorm/mappers';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeORMTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(TypeORMTodoEntity)
    private readonly repository: Repository<TypeORMTodoEntity>,
  ) {}

  public async save(todo: Todo): Promise<void> {
    await this.repository.save(todo);
  }

  public async remove(todoId: string): Promise<void> {
    const todo = await this.repository.findOne({
      where: { id: todoId },
    });

    await this.repository.softRemove(todo);
  }

  public async getById(todoId: string): Promise<Todo | null> {
    const todo = await this.repository.findOne({
      where: {
        id: todoId,
      },
    });

    if (!todo) return null;

    return TypeORMTodoMapper.toDomain(todo);
  }
}
