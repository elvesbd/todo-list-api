import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ApiPath, ApiTodosListTag } from '../../constants';
import { SaveTodosListUseCase } from '@core/todos-list/usecases/save';
import { TodosListViewModel } from '@infra/http/adapters/view-model/todosList';
import { SaveTodosListDto } from '@infra/http/adapters/controllers/todos-list/dtos';

@ApiTags(ApiTodosListTag)
@Controller(ApiPath)
export class SaveTodosListController {
  constructor(private readonly saveTodosListUseCase: SaveTodosListUseCase) {}

  @ApiOperation({
    summary: 'Cadastrar nova lista',
    description: 'Cria uma nova lista de tarefas.',
  })
  @ApiBody({
    description: 'Propriedades para criar uma nova lista',
    type: SaveTodosListDto,
    required: true,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Dados de entrada inválidos.',
  })
  @Post('todos-list')
  @HttpCode(HttpStatus.CREATED)
  public async saveTodosList(@Body() dto: SaveTodosListDto): Promise<void> {
    const { todosList } = await this.saveTodosListUseCase.execute(dto);

    return TodosListViewModel.toHTTPForUpdate(todosList);
  }
}
