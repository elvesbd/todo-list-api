import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpCode, HttpStatus, Controller, Get } from '@nestjs/common';

import {
  TodosListViewModel,
  TodosListVMResponse,
} from '@infra/http/adapters/view-model/todosList';
import { ApiPath, ApiTodosListTag } from '../../constants';
import { GetAllTodosListUseCase } from '@core/todos-list/usecases';

@ApiTags(ApiTodosListTag)
@Controller(ApiPath)
export class GetAllTodosListController {
  constructor(
    private readonly getAllTodosListUseCase: GetAllTodosListUseCase,
  ) {}

  @ApiOperation({ summary: 'Recuperar lista de tarefas.' })
  @ApiOkResponse({
    description: 'Lista de tarefas recuperada com sucesso.',
    type: TodosListVMResponse,
    isArray: true,
  })
  @Get('todos-list')
  @HttpCode(HttpStatus.OK)
  public async getAllTodosList(): Promise<TodosListVMResponse[] | void> {
    const todosList = await this.getAllTodosListUseCase.execute();

    return TodosListViewModel.toHTTPList(todosList);
  }
}
