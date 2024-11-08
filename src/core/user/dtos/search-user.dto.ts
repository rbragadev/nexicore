import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @ApiProperty({
    example: 'joao',
    description: 'Parte do nome do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'example.com',
    description: 'Parte do email do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: '123456789',
    description: 'Parte do CPF do usuário (sem pontuação)',
    required: false,
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({
    example: '99999',
    description: 'Parte do telefone do usuário (sem pontuação)',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string;
}
