import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class DialogflowService {
  constructor(private readonly userService: UserService) {}

  async welcomeIntent(userId: number) {
    const user = await this.userService.getUserById(userId);
    const welcomeMessage = `Bem vindo ${user.name} a secretaria de saude! Como posso te ajudar?`;
    return this.formatFulfillmentMessage(welcomeMessage);
  }

  private formatFulfillmentMessage(text: string): any {
    return {
      fulfillmentResponse: {
        messages: [
          {
            text: {
              text: [text],
            },
          },
        ],
      },
    };
  }
}
