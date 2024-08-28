import {
  Put,
  Body,
  Param,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiUnprocessableEntityResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { ApiPath, ApiTodosListTag } from '../../constants';
import { UpdateTodosListUseCase } from '@core/todos-list/usecases';
import {
  SaveTodosListDto,
  UpdateTodosListDto,
} from '@infra/http/adapters/controllers/todos-list/dtos';

@ApiBearerAuth()
@ApiTags(ApiTodosListTag)
@Controller(ApiPath)
export class UpdateTodosListController {
  constructor(
    private readonly updateTodosListUseCase: UpdateTodosListUseCase,
  ) {}

  @ApiOperation({
    summary: 'Atualizar lista de tarefas',
    description: 'Atualiza lista de tarefas.',
  })
  @ApiBody({
    description: 'Propriedades para atualizar uma lista',
    type: SaveTodosListDto,
    required: true,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Dados de entrada inválidos.',
  })
  @Put('todos-list/:id')
  @HttpCode(HttpStatus.CREATED)
  public async updateTodosList(
    @Param('id') id: string,
    @Body() dto: UpdateTodosListDto,
  ): Promise<void> {
    await this.updateTodosListUseCase.execute({
      id,
      ...dto,
    });
  }
}
