import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiPath, ApiAuthTag } from '../constants';
import { AuthenticateUseCase } from '@core/auth/usecases';
import { AuthenticateDto } from './dtos/authenticate.dto';

@ApiTags(ApiAuthTag)
@Controller(ApiPath)
export class AuthenticateController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @ApiOperation({
    summary: 'Autenticar usuário',
    description:
      'Autentica um usuário no sistema, gerando um token JWT se as credenciais forem válidas.',
  })
  @ApiBody({
    description: 'Dados necessários para autenticação do usuário',
    type: AuthenticateDto,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Autenticação realizada com sucesso. Retorna um token JWT.',
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description:
      'Dados de entrada inválidos. Verifique as credenciais fornecidas.',
  })
  @Post('auth')
  @HttpCode(HttpStatus.CREATED)
  public async authenticate(
    @Body() dto: AuthenticateDto,
  ): Promise<{ accessToken: string }> {
    return await this.authenticateUseCase.execute(dto);
  }
}
