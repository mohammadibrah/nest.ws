import { Injectable } from '@nestjs/common';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class WebsocketService {
  ws: WebSocketSubject<any> = webSocket({
    // url: 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
    url: 'ws://192.168.1.20:9001',
    deserializer: (msg) => msg,
  });

  sendMessage(msg: string) {
    this.ws.next({ message: msg });
  }
}
