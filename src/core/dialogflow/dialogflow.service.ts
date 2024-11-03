import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class DialogflowService {
  constructor(private readonly userService: UserService) {}

  async welcomeIntent(userId: number) {
    const user = await this.userService.getUserById(userId);
    const welcomeMessage = `Bem vindo ${user.name} a secretaria de saude! Como posso te ajudar?`;
    console.log('Mensagem de boas-vindas:', welcomeMessage);
    const fulfillment_response = this.formatFulfillmentMessage(welcomeMessage);
    console.log('Resposta formatada:', fulfillment_response);
    return fulfillment_response;
  }

  private formatFulfillmentMessage(text: string): any {
    return {
      fulfillmentText: text,
      fulfillmentMessages: [
        {
          text: {
            text: [text],
          },
        },
      ],
    };
  }
}
