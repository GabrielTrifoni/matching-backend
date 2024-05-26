import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { NoticiaModule } from './noticia/noticia.module';
import { HistoricoDoacaoModule } from './historico_doacao/historico_doacao.module';
import { ProjetoModule } from './projeto/projeto.module';
import { InteresseModule } from './interesse/interesse.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5441,
      database: 'projetoDB',
      username: 'postgres',
      password: 'postgres',
    }),
    UsuarioModule,
    NoticiaModule,
    HistoricoDoacaoModule,
    ProjetoModule,
    InteresseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
