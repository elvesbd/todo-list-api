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
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ApiPath, ApiTodoTag } from '../../constants';
import { UpdateTodoStatusUseCase } from '@core/todo/usecases';
import { UpdateStatusDto } from '@infra/http/adapters/controllers/todo/dtos';

@ApiBearerAuth()
@ApiTags(ApiTodoTag)
@Controller(ApiPath)
export class UpdateTodoStatusController {
  constructor(
    private readonly updateTodoStatusUseCase: UpdateTodoStatusUseCase,
  ) {}

  @ApiOperation({
    summary: 'Editar Status da Tarefa',
    description: 'Atualiza o status de um tarefa existente.',
  })
  @ApiBody({
    description: 'Status da tarefa',
    type: UpdateStatusDto,
    required: true,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Dados de entrada inválidos. Retorna notificações se houver erros.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa a ser editada',
    type: String,
  })
  @Put('todos/update-status/:id')
  @HttpCode(HttpStatus.OK)
  public async updateTodoStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ): Promise<void> {
    await this.updateTodoStatusUseCase.execute({
      id,
      ...dto,
    });
  }
}
