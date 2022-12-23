import { Injectable } from '@nestjs/common';
// import { read, readFile } from 'xlsx';
// import {excelToJson} from 'convert-excel-to-json';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const excelToJson = require('convert-excel-to-json');

@Injectable()
export class XmlImporterService {
  convertXmlToJson() {
    const result = excelToJson({
      sourceFile:
        '/home/mastertech/demos/nest.ws/src/xml-importer/Summary.xlsx',
      sheets: [
        {
          name: 'Sheet1',
          header: {
            rows: 1,
          },
          columnToKey: {
            A: 'Login',
            B: 'Name',
            C: 'Volume',
            D: 'Commission',
          },
        },
      ],
    });
    return result;
  }
}
