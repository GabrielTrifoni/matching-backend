import { Module } from '@nestjs/common';
import { InteresseService } from './interesse.service';
import { InteresseController } from './interesse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interesse } from 'src/interesse/entities/interesse.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interesse, Projeto, Usuario])],
  controllers: [InteresseController],
  providers: [InteresseService],
})
export class InteresseModule {}
