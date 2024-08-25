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

  @ApiOperation({ summary: 'Get all todos for a specific todos list' })
  @ApiParam({ name: 'todosListId', description: 'ID of the todos list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Todos successfully retrieved',
    type: TodoVMResponse,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Todos list not found',
  })
  @HttpCode(HttpStatus.OK)
  @Get('todos/todos-list/:todosListId')
  public async getTodosByTodosList(
    @Param('todosListId') todosListId: string,
  ): Promise<TodoVMResponse[] | void> {
    const todos = await this.getTodosByTodosListUseCase.execute(todosListId);

    return TodoViewModel.toHTTPList(todos);
  }
}
