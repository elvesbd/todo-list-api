import {
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { ApiPath, ApiTodosListTag } from '../../constants';
import { RemoveTodosListUseCase } from '@core/todos-list/usecases/remove';

@ApiTags(ApiTodosListTag)
@Controller(ApiPath)
export class RemoveTodosListController {
  constructor(
    private readonly removeTodosListUseCase: RemoveTodosListUseCase,
  ) {}

  @ApiOperation({
    summary: 'Excluir lista de tarefas',
    description: 'Exclui a lista e todas as tarefas que pertencem a lista.',
  })
  @ApiNoContentResponse({
    description: 'A List foi excluída com sucesso.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da lista a ser excluída.',
    type: String,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('todos-list/:id')
  public async removeTodosList(@Param('id') id: string): Promise<void> {
    await this.removeTodosListUseCase.execute({ id });
  }
}
