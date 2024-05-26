import { Module } from '@nestjs/common';
import { UsuarioAssunto } from './entities/usuario-assunto.entity';
import { Assunto } from 'src/assunto/entities/assunto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioAssunto, Assunto, Usuario])],
})
export class UsuarioAssuntoModule {}
