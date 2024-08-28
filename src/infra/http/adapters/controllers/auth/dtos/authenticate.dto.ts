import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class AuthenticateDto {
  @ApiProperty({
    description: 'Endereço de e-mail do usuário para autenticação.',
    example: 'admin@mail.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário.',
    example: '@password123',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio.' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  password: string;
}
