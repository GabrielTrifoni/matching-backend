import { Module } from '@nestjs/common';
import { DivulgacaoService } from './divulgacao.service';
import { DivulgacaoController } from './divulgacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Divulgacao } from 'src/divulgacao/entities/divulgacao.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Divulgacao, Usuario])],
  controllers: [DivulgacaoController],
  providers: [DivulgacaoService],
})
export class DivulgacaoModule {}
