import { Body, Controller, Post } from '@nestjs/common';
import { NlpService } from './nlp.service';

@Controller('nlp')
export class NlpController {
  constructor(private readonly nlpService: NlpService) {}

  @Post('classify')
  classifyText(@Body('text') text: string): { intent: string } {
    const intent = this.nlpService.classifyIntent(text);

    switch (intent) {
      case 'check_schedule':
        console.log('Intent: check_schedule - Verificando a agenda');
        break;
      case 'create_appointment':
        console.log('Intent: create_appointment - Marcando uma consulta');
        break;
      case 'list_professionals':
        console.log('Intent: list_professionals - Listando profissionais');
        break;
      case 'check_finance_status':
        console.log(
          'Intent: check_finance_status - Consultando status financeiro',
        );
        break;
      default:
        console.log('Intent: unknown - Intenção não reconhecida');
        break;
    }

    return { intent };
  }
}
