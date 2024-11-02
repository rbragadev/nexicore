import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService, PrismaService],
  exports: [ProfessionalsService],
})
export class ProfessionalsModule {}
