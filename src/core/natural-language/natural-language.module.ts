import { Module } from '@nestjs/common';
import { NaturalLanguageService } from './natural-language.service';
import { NaturalLanguageController } from './natural-language.controller';
import { ProfessionalsModule } from 'src/departments/health/professionals/professionals.module';

@Module({
  imports: [ProfessionalsModule],
  controllers: [NaturalLanguageController],
  providers: [NaturalLanguageService],
})
export class NaturalLanguageModule {}
