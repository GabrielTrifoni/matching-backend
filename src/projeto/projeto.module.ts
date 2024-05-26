import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Doacao } from 'src/doacao/entities/doacao.entity';
import { Interesse } from 'src/interesse/entities/interesse.entity';
import { ProjetoAssunto } from 'src/assunto/entities/projeto-assunto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Projeto,
      Doacao,
      Interesse,
      ProjetoAssunto,
      Usuario,
    ]),
  ],
  controllers: [ProjetoController],
  providers: [ProjetoService],
})
export class ProjetoModule {}
