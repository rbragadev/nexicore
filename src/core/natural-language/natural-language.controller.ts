import { Body, Controller, Post } from '@nestjs/common';
import { NaturalLanguageService } from './natural-language.service';

@Controller('natural-language')
export class NaturalLanguageController {
  constructor(
    private readonly naturalLanguageService: NaturalLanguageService,
  ) {}

  @Post('ask')
  async askQuestion(
    @Body('userId') userId: string,
    @Body('question') question: string,
  ) {
    const response = await this.naturalLanguageService.askQuestion(
      userId,
      question,
    );
    return { response };
  }
}
