import { Test, TestingModule } from '@nestjs/testing';
import { HtmImporterService } from './htm-importer.service';

describe('HtmImporterService', () => {
  let service: HtmImporterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HtmImporterService],
    }).compile();

    service = module.get<HtmImporterService>(HtmImporterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
