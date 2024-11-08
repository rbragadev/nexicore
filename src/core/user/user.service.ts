import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PasswordService } from 'src/common/services/password.service';
import { FilterUserDto } from './dtos/filter.user.dto';
import { SearchUserDto } from './dtos/search-user.dto';

@Injectable()
export class UserService {
  private readonly passwordService = new PasswordService();
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );

    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async update(user_id: number, data: UpdateUserDto) {
    await this.findOne(user_id);
    return this.prisma.user.update({ where: { user_id }, data });
  }

  async findOne(user_id: number) {
    const user = await this.prisma.user.findUnique({ where: { user_id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findByFilters(filterDto: FilterUserDto) {
    const { user_id, cpf, phone_number } = filterDto;

    const where: any = {};

    if (user_id) where.user_id = user_id;
    if (cpf) where.cpf = cpf.replace(/\D/g, ''); // Remove pontuações
    if (phone_number) where.phone_number = phone_number.replace(/\D/g, '');

    const user = await this.prisma.user.findFirst({ where });

    if (!user) {
      throw new NotFoundException(
        'Usuário não encontrado com os filtros fornecidos',
      );
    }

    return user;
  }

  async searchUsers(searchDto: SearchUserDto, paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const { name, email, cpf, phone_number } = searchDto;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: any = {};

    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (cpf)
      where.cpf = { contains: cpf.replace(/\D/g, ''), mode: 'insensitive' };
    if (phone_number)
      where.phone_number = {
        contains: phone_number.replace(/\D/g, ''),
        mode: 'insensitive',
      };

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    if (users.length === 0) {
      throw new NotFoundException(
        'Nenhum usuário encontrado com os filtros aplicados.',
      );
    }

    return {
      data: users,
      meta: {
        total,
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
      },
    };
  }
}
