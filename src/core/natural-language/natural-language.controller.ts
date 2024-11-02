import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NaturalLanguageService } from './natural-language.service';
import { CreateNaturalLanguageDto } from './dto/create-natural-language.dto';
import { UpdateNaturalLanguageDto } from './dto/update-natural-language.dto';

@Controller('natural-language')
export class NaturalLanguageController {
  constructor(private readonly naturalLanguageService: NaturalLanguageService) {}

  @Post()
  create(@Body() createNaturalLanguageDto: CreateNaturalLanguageDto) {
    return this.naturalLanguageService.create(createNaturalLanguageDto);
  }

  @Get()
  findAll() {
    return this.naturalLanguageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.naturalLanguageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNaturalLanguageDto: UpdateNaturalLanguageDto) {
    return this.naturalLanguageService.update(+id, updateNaturalLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.naturalLanguageService.remove(+id);
  }
}
