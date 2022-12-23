import { Test, TestingModule } from '@nestjs/testing';
import { XmlImporterService } from './xml-importer.service';

describe('XmlImporterService', () => {
  let service: XmlImporterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XmlImporterService],
    }).compile();

    service = module.get<XmlImporterService>(XmlImporterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
