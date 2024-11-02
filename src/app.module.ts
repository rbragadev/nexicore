import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/prisma/prisma.service';
import { SchedulingModule } from './core/scheduling/scheduling.module';
import { NaturalLanguageModule } from './core/natural-language/natural-language.module';
import { ProfessionalsModule } from './departments/health/professionals/professionals.module';
import { InventoryModule } from './departments/health/inventory/inventory.module';

@Module({
  imports: [
    SchedulingModule,
    NaturalLanguageModule,
    ProfessionalsModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
