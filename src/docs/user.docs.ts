import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateUserDto } from 'src/core/user/dtos/create-user.dto';
import { FilterUserDto } from 'src/core/user/dtos/filter.user.dto';
import { SearchUserDto } from 'src/core/user/dtos/search-user.dto';
import { UpdateUserDto } from 'src/core/user/dtos/update-user.dto';

export function CreateUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria um novo usuário',
      description: 'Este endpoint cria um novo usuário no sistema.',
    }),
    ApiBody({
      description: 'Dados para criação do usuário',
      type: CreateUserDto,
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

export function UpdateUserDocs() {
  return applyDecorators(
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

export function FindUserByIdDocs() {
  return applyDecorators(
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

export function FindUserByFiltersDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Busca usuários com base em filtros',
      description:
        'Este endpoint permite buscar usuários usando filtros como ID, CPF e número de telefone.',
    }),
    ApiExtraModels(FilterUserDto),
    ApiQuery({
      name: 'filters',
      description: 'Parâmetros de filtro para a busca de usuários',
      required: false,
      schema: {
        $ref: getSchemaPath(FilterUserDto),
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Usuários encontrados com sucesso.',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            user_id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao.silva@example.com' },
            cpf: { type: 'string', example: '123.456.789-00' },
            phone_number: { type: 'string', example: '+55 (11) 99999-9999' },
            is_active: { type: 'boolean', example: true },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Nenhum usuário encontrado com os filtros aplicados.',
    }),
  );
}

export function SearchUsersDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Busca parcial de usuários',
      description:
        'Permite buscar usuários por partes do nome, email, CPF ou telefone.',
    }),
    ApiExtraModels(SearchUserDto, PaginationDto),
    ApiQuery({
      name: 'searchDto',
      required: false,
      schema: { $ref: getSchemaPath(SearchUserDto) },
    }),
    ApiQuery({
      name: 'pagination',
      required: false,
      schema: { $ref: getSchemaPath(PaginationDto) },
    }),
    ApiResponse({
      status: 200,
      description: 'Usuários encontrados com sucesso.',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                user_id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'João Silva' },
                email: { type: 'string', example: 'joao.silva@example.com' },
                cpf: { type: 'string', example: '123.456.789-00' },
                phone_number: {
                  type: 'string',
                  example: '+55 (11) 99999-9999',
                },
                is_active: { type: 'boolean', example: true },
              },
            },
          },
          meta: {
            type: 'object',
            properties: {
              total: { type: 'number', example: 100 },
              page: { type: 'number', example: 1 },
              pageSize: { type: 'number', example: 10 },
              pageCount: { type: 'number', example: 10 },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Nenhum usuário encontrado.',
    }),
  );
}
