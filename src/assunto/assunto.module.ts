import { Module } from '@nestjs/common';
import { AssuntoService } from './assunto.service';
import { AssuntoController } from './assunto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assunto } from './entities/assunto.entity';
import { ProjetoAssunto } from './entities/projeto-assunto.entity';
import { UsuarioAssunto } from '../usuario-assunto/entities/usuario-assunto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assunto, ProjetoAssunto, UsuarioAssunto]),
  ],
  controllers: [AssuntoController],
  providers: [AssuntoService],
})
export class AssuntoModule {}
