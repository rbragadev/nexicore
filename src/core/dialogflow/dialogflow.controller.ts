import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { DialogflowService } from './dialogflow.service';

@Controller('dialogflow')
export class DialogflowController {
  constructor(private readonly dialogflowService: DialogflowService) {}

  @Post('webhook')
  @HttpCode(200)
  async welcomeIntent(@Body() body: any) {
    console.log('Recebido do Dialogflow:', JSON.stringify(body, null, 2));

    // Acessa o ID no local correto (queryResult.parameters)
    const id = body.queryResult?.parameters?.id;
    console.log('ID:', id);

    // Chama o serviço com o ID extraído
    const welcomeMessage = await this.dialogflowService.welcomeIntent(+id);
    return welcomeMessage;
  }
}
