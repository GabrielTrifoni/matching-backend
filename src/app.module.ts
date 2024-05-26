import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { DivulgacaoModule } from './divulgacao/divulgacao.module';
import { HistoricoDoacaoModule } from './historico_doacao/historico_doacao.module';
import { ProjetoModule } from './projeto/projeto.module';
import { InteresseModule } from './interesse/interesse.module';
import { UsuarioAssuntoModule } from './usuario-assunto/usuario-assunto.module';
import { ProjetoAssuntoModule } from './projeto-assunto/projeto-assunto.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsuarioModule,
    DivulgacaoModule,
    HistoricoDoacaoModule,
    ProjetoModule,
    InteresseModule,
    UsuarioAssuntoModule,
    ProjetoAssuntoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
