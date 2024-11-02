import { Injectable } from '@nestjs/common';
import { CreateNaturalLanguageDto } from './dto/create-natural-language.dto';
import { UpdateNaturalLanguageDto } from './dto/update-natural-language.dto';

@Injectable()
export class NaturalLanguageService {
  create(createNaturalLanguageDto: CreateNaturalLanguageDto) {
    return 'This action adds a new naturalLanguage';
  }

  findAll() {
    return `This action returns all naturalLanguage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} naturalLanguage`;
  }

  update(id: number, updateNaturalLanguageDto: UpdateNaturalLanguageDto) {
    return `This action updates a #${id} naturalLanguage`;
  }

  remove(id: number) {
    return `This action removes a #${id} naturalLanguage`;
  }
}
