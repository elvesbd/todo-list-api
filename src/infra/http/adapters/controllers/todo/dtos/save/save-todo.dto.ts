import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class SaveTodoDto {
  @ApiProperty({
    description: 'Título ou nome da tarefa.',
    example: 'Concluir o relatório trimestral',
    maxLength: 140,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 140)
  name: string;

  @ApiProperty({
    description: 'ID único da Lista.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  todosLisId: string;
}
