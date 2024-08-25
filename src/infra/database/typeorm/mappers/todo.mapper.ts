import { Todo } from '@core/todo/model';
import { TypeORMTodoEntity } from '../entities';

export class TypeORMTodoMapper {
  private constructor() {
    throw new Error(
      'TypeORMUserMapper is a static class and should not be instantiated.',
    );
  }

  public static toDomain(persistence: TypeORMTodoEntity): Todo {
    return new Todo(persistence);
  }

  public static toPersistence(domain: Todo): TypeORMTodoEntity {
    return {
      id: domain.id,
      name: domain.name,
      status: domain.status,
    };
  }
}
