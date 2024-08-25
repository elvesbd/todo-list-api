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
  ApiBearerAuth,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { ApiPath, ApiTodoTag } from '../../constants';
import { RemoveTodoUseCase } from '@core/todo/usecases';

@ApiBearerAuth()
@ApiTags(ApiTodoTag)
@Controller(ApiPath)
export class RemoveTodoController {
  constructor(private readonly removeTodoUseCase: RemoveTodoUseCase) {}

  @ApiOperation({
    summary: 'Excluir tarefa',
    description: 'Exclui um registro de tarefa usando o ID especificado.',
  })
  @ApiNoContentResponse({
    description: 'A tarefa foi excluída com sucesso.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa a ser excluída.',
    type: String,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('todos/:id')
  public async deleteTodo(@Param('id') id: string): Promise<void> {
    await this.removeTodoUseCase.execute({ id });
  }
}
