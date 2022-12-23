import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';
import { WebsocketService } from './websocket/websocket.service';
import { MessageService } from './message/message.service';
import { XmlImporterService } from './xml-importer/xml-importer.service';
import { HtmImporterService } from './htm-importer/htm-importer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppGateway,
    WebsocketService,
    MessageService,
    XmlImporterService,
    HtmImporterService,
  ],
})
export class AppModule {}
