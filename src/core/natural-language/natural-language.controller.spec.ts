import { Test, TestingModule } from '@nestjs/testing';
import { NaturalLanguageController } from './natural-language.controller';
import { NaturalLanguageService } from './natural-language.service';

describe('NaturalLanguageController', () => {
  let controller: NaturalLanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NaturalLanguageController],
      providers: [NaturalLanguageService],
    }).compile();

    controller = module.get<NaturalLanguageController>(NaturalLanguageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
