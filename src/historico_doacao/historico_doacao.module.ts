import { Module } from '@nestjs/common';
import { HistoricoDoacaoService } from './historico_doacao.service';
import { HistoricoDoacaoController } from './historico_doacao.controller';

@Module({
  controllers: [HistoricoDoacaoController],
  providers: [HistoricoDoacaoService],
})
export class HistoricoDoacaoModule {}
