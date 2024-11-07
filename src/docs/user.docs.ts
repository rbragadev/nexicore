import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/core/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/core/user/dtos/update-user.dto';

// Decorator para o endpoint de criação de usuário
export function CreateUserDocs() {
  return applyDecorators(
    ApiTags('users'),
    ApiOperation({
      summary: 'Cria um novo usuário',
      description: 'Este endpoint cria um novo usuário no sistema.',
    }),
    ApiBody({
      description: 'Dados para criação do usuário',
      type: CreateUserDto, // Referencia o DTO diretamente aqui
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário criado com sucesso.',
    }),
    ApiResponse({
      status: 400,
      description: 'Dados inválidos.',
    }),
  );
}

// Decorator para o endpoint de atualização de usuário
export function UpdateUserDocs() {
  return applyDecorators(
    ApiTags('users'),
    ApiOperation({
      summary: 'Atualiza um usuário existente',
      description:
        'Este endpoint atualiza as informações de um usuário existente com base no ID.',
    }),
    ApiParam({
      name: 'user_id',
      description: 'ID do usuário que será atualizado',
      type: Number,
    }),
    ApiBody({
      description: 'Dados para atualização do usuário',
      type: UpdateUserDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Usuário atualizado com sucesso.',
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado.',
    }),
  );
}

// Decorator para o endpoint de busca de usuário pelo ID
export function FindUserByIdDocs() {
  return applyDecorators(
    ApiTags('users'),
    ApiOperation({
      summary: 'Busca um usuário pelo ID',
      description:
        'Este endpoint retorna as informações de um usuário específico pelo ID.',
    }),
    ApiParam({
      name: 'user_id',
      description: 'ID do usuário a ser buscado',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'Usuário encontrado com sucesso.',
      schema: {
        type: 'object',
        properties: {
          user_id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'João Silva' },
          email: { type: 'string', example: 'joao.silva@example.com' },
          cpf: { type: 'string', example: '12345678900' },
          phone_number: { type: 'string', example: '+5511999999999' },
          address: { type: 'string', example: 'Rua Exemplo, 123' },
          birthdate: { type: 'string', format: 'date', example: '2000-01-01' },
          is_active: { type: 'boolean', example: true },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado.',
    }),
  );
}
