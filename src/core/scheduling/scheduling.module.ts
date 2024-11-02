import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SchedulingController],
  providers: [SchedulingService, PrismaService],
  exports: [SchedulingService],
})
export class SchedulingModule {}
