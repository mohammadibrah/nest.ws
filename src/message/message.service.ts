import { Injectable } from '@nestjs/common';

export type SocketMessage = {
  type: string;
  data: any;
};

@Injectable()
export class MessageService {
  extractMessageContent(message: SocketMessage): string {
    const { login, server, method, amount, comment } = message.data;
    const ack = `${method}${Math.floor(Math.random() * 100)}`;
    if (server === 'MT4') {
      return `${method}|${ack}|${login}|${amount}`;
    }
    if (server === 'MT5') {
      return `${method}|${login}|${amount}|2|${comment || 'comment'}`;
    }
  }
  createMessage(type: string, data: string): SocketMessage {
    return { type, data };
  }
}
