import { UnprocessableEntityException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Todo } from '@core/todo/model';
import { BaseViewModel } from '@infra/http/adapters/view-model';

export class TodoVMResponse {
  @ApiProperty({
    description: 'ID único da tarefa.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Título ou nome da tarefa.',
    example: 'Concluir o relatório trimestral',
    maxLength: 140,
  })
  name: string;

  @ApiProperty({
    description: 'Status de conclusão da tarefa.',
    example: true,
  })
  status: boolean;

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

export class TodoViewModel implements BaseViewModel {
  public static toHTTP(todo: Todo): TodoVMResponse {
    if (todo.containNotifications) {
      throw new UnprocessableEntityException({
        notifications: todo.notifications,
      });
    }

    return {
      id: todo.id,
      name: todo.name,
      status: todo.status,
    };
  }

  public static toHTTPForUpdate(todo: Todo): void {
    if (todo.containNotifications) {
      throw new UnprocessableEntityException({
        notifications: todo.notifications,
      });
    }
  }
}
