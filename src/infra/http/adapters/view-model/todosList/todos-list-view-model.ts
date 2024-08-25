import { ApiProperty } from '@nestjs/swagger';
import { UnprocessableEntityException } from '@nestjs/common';

import { TodosList } from '@core/todos-list/model';
import { BaseViewModel } from '@infra/http/adapters/view-model';

export class TodosListVMResponse {
  @ApiProperty({
    description: 'ID único da lista.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Título ou nome da lista.',
    example: 'Supermercados',
    maxLength: 140,
  })
  name: string;

  @ApiProperty({
    description: 'Cor da lista.',
    example: '#ffffff',
  })
  color: string;

  @ApiProperty({
    description: 'Notificações relacionadas à tarefa.',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    required: false,
  })
  notifications?: { [key: string]: string[] };
}

export class TodosListViewModel implements BaseViewModel {
  public static toHTTP(todosList: TodosList): TodosListVMResponse {
    if (todosList.containNotifications) {
      throw new UnprocessableEntityException({
        notifications: todosList.notifications,
      });
    }

    return {
      id: todosList.id,
      name: todosList.name,
      color: todosList.color,
    };
  }

  public static toHTTPList(todosList: TodosList[]): TodosListVMResponse[] {
    return todosList.map((todoList) => ({
      id: todoList.id,
      name: todoList.name,
      color: todoList.color,
    }));
  }

  public static toHTTPForUpdate(todosList: TodosList): void {
    if (todosList.containNotifications) {
      throw new UnprocessableEntityException({
        notifications: todosList.notifications,
      });
    }
  }
}
