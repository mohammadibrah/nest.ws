import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebsocketService } from './websocket/websocket.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private ws: WebsocketService) {
    this.ws.ws.subscribe({
      next: (msg) => {
        // console.log('Message from server: ' + JSON.stringify(msg));
        const msgToSend = msg.data;
        this.server.emit('msgToClient', msgToSend);
        this.logger.log('Message from Remote server: ' + msgToSend);
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
    this.ws.sendMessage('Hello from nest');
  }
  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ' + client.id);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ' + client.id);
  }
  private logger: Logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log('Initialized!');
  }
  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, text: string) {
    this.logger.log('Message from client: ' + text);
    this.ws.sendMessage(text);
    client.emit('msgToClient', text);
    // this.server.emit('msgToClient', text);
  }
}
