import { TodosList } from '@core/todos-list/model';
import { TypeORMTodosListEntity } from '@infra/database/typeorm/entities';

export class TypeORMTodosListMapper {
  private constructor() {
    throw new Error(
      'TypeORMTodosListMapper is a static class and should not be instantiated.',
    );
  }

  public static toDomain(persistence: TypeORMTodosListEntity): TodosList {
    return new TodosList(persistence);
  }

  public static toDomainList(
    persistence: TypeORMTodosListEntity[],
  ): TodosList[] {
    return persistence.map((todoList) => new TodosList(todoList));
  }

  public static toPersistence(domain: TodosList): TypeORMTodosListEntity {
    return {
      id: domain.id,
      name: domain.name,
      color: domain.color,
    };
  }
}
