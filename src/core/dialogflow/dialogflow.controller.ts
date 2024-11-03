import { Body, Controller, Post } from '@nestjs/common';
import { DialogflowService } from './dialogflow.service';

@Controller('dialogflow')
export class DialogflowController {
  constructor(private readonly dialogflowService: DialogflowService) {}

  @Post('webhook')
  async welcomeIntent(@Body() body: any) {
    const id = body.sessionInfo.parameters.id;
    console.log('ID:', id);
    const welcomeMessage = await this.dialogflowService.welcomeIntent(+id);
    return welcomeMessage;
  }
}
