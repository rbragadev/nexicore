import { Module } from '@nestjs/common';
import { NaturalLanguageService } from './natural-language.service';
import { NaturalLanguageController } from './natural-language.controller';
import { ProfessionalsModule } from 'src/departments/health/professionals/professionals.module';
import { SchedulingModule } from '../scheduling/scheduling.module';

@Module({
  imports: [ProfessionalsModule, SchedulingModule],
  controllers: [NaturalLanguageController],
  providers: [NaturalLanguageService],
})
export class NaturalLanguageModule {}
