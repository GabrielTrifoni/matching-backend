import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoDoacaoController } from './historico_doacao.controller';
import { HistoricoDoacaoService } from './historico_doacao.service';

describe('HistoricoDoacaoController', () => {
  let controller: HistoricoDoacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricoDoacaoController],
      providers: [HistoricoDoacaoService],
    }).compile();

    controller = module.get<HistoricoDoacaoController>(HistoricoDoacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
