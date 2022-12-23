import { Controller, Get } from '@nestjs/common';
import { HtmImporterService } from './htm-importer/htm-importer.service';
import { XmlImporterService } from './xml-importer/xml-importer.service';

@Controller('app')
export class AppController {
  constructor(
    private htm: HtmImporterService,
    private xml: XmlImporterService,
  ) {}
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Get('htm')
  convertHtmlToJson() {
    const tbl = this.htm.convertHtmlToJson();
    return JSON.stringify(tbl);
  }
  @Get('xml')
  convertXmlToJson() {
    const tbl = this.xml.convertXmlToJson();
    return JSON.stringify(tbl);
  }
}
