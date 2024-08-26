import { Todo } from '@core/todo/model';
import { TypeORMTodoEntity } from '@infra/database/typeorm/entities';

export class TypeORMTodoMapper {
  private constructor() {
    throw new Error(
      'TypeORMUserMapper is a static class and should not be instantiated.',
    );
  }

  public static toDomain(persistence: TypeORMTodoEntity): Todo {
    return new Todo(persistence);
  }

  public static toDomainList(persistence: TypeORMTodoEntity[]): Todo[] {
    return persistence.map((todo) => new Todo(todo));
  }

  public static toPersistence(domain: Todo): TypeORMTodoEntity {
    return {
      id: domain.id,
      name: domain.name,
      status: domain.status,
    };
  }
}
