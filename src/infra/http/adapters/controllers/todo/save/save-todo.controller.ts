import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
  ApiUnprocessableEntityResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { ApiPath, ApiTodoTag } from '../../constants';
import { SaveTodoUseCase } from '@core/todo/usecases/save';
import { TodoViewModel } from '@infra/http/adapters/view-model';
import { SaveTodoDto } from '@infra/http/adapters/controllers/todo/dtos';

@ApiBearerAuth()
@ApiTags(ApiTodoTag)
@Controller(ApiPath)
export class SaveTodoController {
  constructor(private readonly saveTodoUseCase: SaveTodoUseCase) {}

  @ApiOperation({
    summary: 'Cadastrar nova tarefa',
    description:
      'Cria um novo registro de tarefa no sistema com um status inicial de falso.',
  })
  @ApiBody({
    description: 'Propriedades para criar uma nova tarefa',
    type: SaveTodoDto,
    required: true,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Dados de entrada inválidos.',
  })
  @Post('todos')
  @HttpCode(HttpStatus.CREATED)
  public async saveTodo(@Body() dto: SaveTodoDto): Promise<void> {
    const { todo } = await this.saveTodoUseCase.execute(dto);

    return TodoViewModel.toHTTPForUpdate(todo);
  }
}
