import { PartialType } from '@nestjs/mapped-types';
import { CreateNaturalLanguageDto } from './create-natural-language.dto';

export class UpdateNaturalLanguageDto extends PartialType(CreateNaturalLanguageDto) {}
