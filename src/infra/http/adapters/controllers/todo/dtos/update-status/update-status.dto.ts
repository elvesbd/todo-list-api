import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Status da tarefa.',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
