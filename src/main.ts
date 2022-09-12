import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
// import { IoAdapter } from '@nestjs/platform-socket.io';
// import { WsAdapter } from '@nestjs/platform-ws';
import { ServerOptions } from 'socket.io';
(global as any).WebSocket = require('ws');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    methods: ['GET', 'POST'],
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    origin: '*',
  };
  app.enableCors();
  // app.useWebSocketAdapter(new SocketAdapter(app));
  // app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}
bootstrap();

// export class SocketAdapter extends IoAdapter {
//   createIOServer(
//     port: number,
//     options?: ServerOptions & {
//       namespace?: string;
//       server?: any;
//     },
//   ) {
//     const server = super.createIOServer(port, { ...options, cors: true });
//     return server;
//   }
// }
