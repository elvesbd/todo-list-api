import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SaveTodosListDto {
  @ApiProperty({
    description: 'Título ou nome da lista.',
    example: 'Supermercados',
    maxLength: 140,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    description: 'Cor da lista em formato hexadecimal.',
    example: '#ffffff',
    minLength: 4,
    maxLength: 7,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 7)
  color: string;
}
