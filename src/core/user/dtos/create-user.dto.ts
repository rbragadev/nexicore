import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678900', description: 'CPF do usuário' })
  @IsString()
  cpf: string;

  @ApiProperty({ example: 'ABcd1234!!', description: 'Senha do usuário' })
  @IsString()
  password: string;

  @ApiProperty({
    example: '+5511999999999',
    description: 'Telefone do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({
    example: 'Rua Exemplo, 123',
    description: 'Endereço do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: '2000-01-01',
    description: 'Data de nascimento do usuário',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  birthdate: Date;

  @ApiProperty({ example: true, description: 'Status ativo do usuário' })
  @IsBoolean()
  is_active: boolean;
}
