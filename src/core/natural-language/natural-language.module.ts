import { Module } from '@nestjs/common';
import { NaturalLanguageService } from './natural-language.service';
import { NaturalLanguageController } from './natural-language.controller';

@Module({
  controllers: [NaturalLanguageController],
  providers: [NaturalLanguageService],
})
export class NaturalLanguageModule {}
