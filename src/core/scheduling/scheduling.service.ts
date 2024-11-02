import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  async createSchedule(data: CreateSchedulingDto) {
    return this.prisma.schedule.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
  }
}
