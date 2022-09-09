import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ' + client.id);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ' + client.id);
  }
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    this.logger.log('Message from client: ' + text);
    return { event: 'msgToClient', data: text };
  }
}
