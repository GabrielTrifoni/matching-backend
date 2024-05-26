import { Module } from '@nestjs/common';
import { DoacaoService } from './doacao.service';
import { DoacaoController } from './doacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doacao } from 'src/doacao/entities/doacao.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { HistoricoDoacao } from 'src/historico_doacao/entities/historico_doacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doacao, Projeto, HistoricoDoacao])],
  controllers: [DoacaoController],
  providers: [DoacaoService],
})
export class DoacaoModule {}
