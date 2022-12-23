import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Tabletojson } from 'tabletojson';

export type Commissions = {
  login: string;
  name: string;
  closedVolume: string;
  commissions: string;
  total: string;
  agentCommission: string;
  agent: string;
};

@Injectable()
export class HtmImporterService {
  agents: { [id: string]: string[] } = {
    '1': ['61102', '61104', '61106', '61108', '61110', '61112', '61114'],
    '2': ['61259', '61260', '61261', '61262', '61263', '61264', '61265'],
    '3': ['7', '8', '9'],
  };
  convertHtmlToJson() {
    const html = fs.readFileSync(
      path.resolve(
        __dirname,
        '/home/mastertech/demos/nest.ws/src/xml-importer/Commissions Report.htm',
      ),
      {
        encoding: 'utf8',
        flag: 'r',
      },
    );
    const tablesAsJson = Tabletojson.convert(html);
    const table = tablesAsJson[0];
    const commissions: Commissions[] = table.map((ob) => {
      return {
        login: ob['0'],
        name: ob['1'],
        closedVolume: ob['2'],
        commissions: ob['3'],
        total: ob['4'],
        agentCommission: ob['5'],
        agent: this.findAgent(ob['0']),
      };
    });
    return commissions;
  }
  findAgent(login: string) {
    for (const id in this.agents) {
      if (this.agents[id].includes(login)) {
        return id;
      }
    }
    return null;
  }
}
