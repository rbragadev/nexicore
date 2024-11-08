import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterUserDto {
  @ApiProperty({ example: 1, description: 'ID do usuário', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  user_id?: number;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({
    example: '+55 (11) 99999-9999',
    description: 'Telefone do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string;
}
