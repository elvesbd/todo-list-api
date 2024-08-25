import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { HttpCode, HttpStatus, Controller, Get } from '@nestjs/common';

import {
  TodosListViewModel,
  TodosListVMResponse,
} from '@infra/http/adapters/view-model/todosList';
import { ApiPath, ApiTodoTag } from '../../constants';
import { GetAllTodosListUseCase } from '@core/todos-list/usecases/get-all';

@ApiBearerAuth()
@ApiTags(ApiTodoTag)
@Controller(ApiPath)
export class GetAllTodosListController {
  constructor(
    private readonly getAllTodosListUseCase: GetAllTodosListUseCase,
  ) {}

  @Get('todos-list')
  @HttpCode(HttpStatus.OK)
  public async getAllTodosList(): Promise<TodosListVMResponse[] | void> {
    const todosList = await this.getAllTodosListUseCase.execute();

    return TodosListViewModel.toHTTPList(todosList);
  }
}
