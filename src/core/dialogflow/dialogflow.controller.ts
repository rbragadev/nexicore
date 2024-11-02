import { Controller, Post, Query } from '@nestjs/common';
import { DialogflowService } from './dialogflow.service';

@Controller('dialogflow')
export class DialogflowController {
  constructor(private readonly dialogflowService: DialogflowService) {}

  @Post('webhook')
  async welcomeIntent(@Query('id') id: string) {
    const welcomeMessage = await this.dialogflowService.welcomeIntent(+id);
    return welcomeMessage;
  }
}
