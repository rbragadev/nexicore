import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async update(user_id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { user_id }, data });
  }

  async findOne(user_id: number) {
    return this.prisma.user.findUnique({ where: { user_id } });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({ skip, take }),
      this.prisma.user.count(),
    ]);

    return {
      data: items,
      meta: {
        total,
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
      },
    };
  }
}
