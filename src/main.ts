import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
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
