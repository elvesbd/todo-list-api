import {
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ApiPath, ApiTodoTag } from '../../constants';
import {
  TodoViewModel,
  TodoVMResponse,
} from '@infra/http/adapters/view-model/todo';
import { UpdateTodoNameUseCase } from '@core/todo/usecases/update-name';
import { UpdateNameDto } from '@infra/http/adapters/controllers/todo/dtos';

@ApiBearerAuth()
@ApiTags(ApiTodoTag)
@Controller(ApiPath)
export class UpdateTodoNameController {
  constructor(private readonly updateTodoNameUseCase: UpdateTodoNameUseCase) {}

  @ApiOperation({
    summary: 'Editar Tarefa',
    description: 'Atualiza o nome de um tarefa existente.',
  })
  @ApiBody({
    description: 'Nome da tarefa',
    type: UpdateNameDto,
    required: true,
  })
  @ApiOkResponse({
    description: 'A tarefa foi atualizada com sucesso',
    type: TodoVMResponse,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Dados de entrada inválidos. Retorna notificações se houver erros.',
  })
  @ApiParam({
    name: 'todoId',
    description: 'ID da tarefa a ser editada',
    type: String,
  })
  @Put('todos/:todoId')
  @HttpCode(HttpStatus.OK)
  public async updateTodoName(
    @Param('todoId') todoId: string,
    @Body() dto: UpdateNameDto,
  ): Promise<TodoVMResponse | void> {
    const { todo } = await this.updateTodoNameUseCase.execute({
      todoId,
      ...dto,
    });

    return TodoViewModel.toHTTPForUpdate(todo);
  }
}
