import { HttpCode, HttpStatus, Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiParam, ApiResponse, ApiOperation } from '@nestjs/swagger';

import {
  TodoViewModel,
  TodoVMResponse,
} from '@infra/http/adapters/view-model/todo';
import { ApiPath, ApiTodoTag } from '../../constants';
import { GetTodosByTodosListUseCase } from '@core/todo/usecases';

@ApiTags(ApiTodoTag)
@Controller(ApiPath)
export class GetTodosByTodosListController {
  constructor(
    private readonly getTodosByTodosListUseCase: GetTodosByTodosListUseCase,
  ) {}

  @ApiOperation({
    summary: 'Obter todas as tarefas para uma lista de tarefas específica',
  })
  @ApiParam({ name: 'todosListId', description: 'ID da lista de tarefas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarefas recuperadas com sucesso',
    type: TodoVMResponse,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Lista de tarefas não encontrada',
  })
  @HttpCode(HttpStatus.OK)
  @Get('todos/todosListId/:todosListId')
  public async getTodosByTodosList(
    @Param('todosListId') todosListId: string,
  ): Promise<TodoVMResponse[] | void> {
    const todos = await this.getTodosByTodosListUseCase.execute(todosListId);

    return TodoViewModel.toHTTPList(todos);
  }
}
