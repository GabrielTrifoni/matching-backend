import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Interesse } from 'src/interesse/entities/interesse.entity';
import { UsuarioAssunto } from 'src/usuario-assunto/entities/usuario-assunto.entity';
import { HistoricoDoacao } from 'src/historico_doacao/entities/historico_doacao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Projeto,
      Interesse,
      HistoricoDoacao,
      UsuarioAssunto,
    ]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
