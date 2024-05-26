import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoDoacaoService } from './historico_doacao.service';

describe('HistoricoDoacaoService', () => {
  let service: HistoricoDoacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricoDoacaoService],
    }).compile();

    service = module.get<HistoricoDoacaoService>(HistoricoDoacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
