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
import { MessageService, SocketMessage } from './message/message.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200, 78.188.47.2, 78.188.47.2:4200, *',
    methods: ['GET', 'POST'],
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');
  connection: { [key: string]: WebSocketSubject<any> };
  subject: WebSocketSubject<any>;

  @WebSocketServer() server: Server;
  constructor(private msgs: MessageService) {
    // this.subject = webSocket({
    //   url: 'ws://192.168.1.20:9001',
    //   // url: 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
    //   serializer: (msg) => msg,
    //   deserializer: ({ data }) => data,
    // });

    // this.subject.subscribe({
    //   next: (data) => {
    //     this.server.emit('msgToClient', data);
    //     this.logger.log('Message from Remote server: ' + data);
    //   },
    // });
    this.connection = {
      MT4: webSocket({
        url: 'ws://78.188.47.2:9001',
        // url: 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
        serializer: (msg) => msg,
        deserializer: ({ data }) => data,
      }),
      MT5: webSocket({
        url: 'ws://78.188.47.2:27418/mt',
        // url: 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
        serializer: (msg) => msg,
        deserializer: ({ data }) => data,
      }),
    };
    Object.entries(this.connection).forEach(([key, subject]) => {
      subject.subscribe({
        next: (data) => {
          this.server.emit('msgToClient', `${key} response: ${data}`);
          this.logger.log(`Message from Remote server ${key}: ${data}`);
        },
      });
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ' + client.id);
  }
  handleConnection(client: Socket) {
    this.logger.log('Client connected: ' + client.id);
  }
  sendToRemoteServer(msg: string, server = 'MT4') {
    // this.subject.next('login|nest');
    // this.subject.next(msg);
    this.connection[server].next('login|nest');
    this.connection[server].next(msg);
  }

  afterInit() {
    this.logger.log('Initialized!');
  }
  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, msgObj: SocketMessage) {
    const msg = this.msgs.extractMessageContent(msgObj) + '';
    const server = msgObj.data.server;
    this.logger.log('Message from client: ' + msg);
    this.sendToRemoteServer(msg, server);
    client.emit('msgToClient', `${server} request: ${msg}`);
  }
}
