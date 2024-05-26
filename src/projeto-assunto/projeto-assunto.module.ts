import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assunto } from 'src/assunto/entities/assunto.entity';
import { ProjetoAssunto } from 'src/assunto/entities/projeto-assunto.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assunto, ProjetoAssunto, Projeto])],
})
export class ProjetoAssuntoModule {}
