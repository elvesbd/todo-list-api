import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateNameDto {
  @ApiProperty({
    description: 'Título ou nome da tarefa.',
    example: 'Concluir o relatório trimestral',
    maxLength: 140,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 140)
  name: string;
}
