import { Module } from '@nestjs/common';
import { HistoricoDoacaoService } from './historico_doacao.service';
import { HistoricoDoacaoController } from './historico_doacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoDoacao } from 'src/historico_doacao/entities/historico_doacao.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Doacao } from 'src/doacao/entities/doacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricoDoacao, Usuario, Doacao])],
  controllers: [HistoricoDoacaoController],
  providers: [HistoricoDoacaoService],
})
export class HistoricoDoacaoModule {}
