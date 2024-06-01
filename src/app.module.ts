import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { DonationHistoryModule } from './donation-history/donation-history.module';
import { ProjectModule } from './project/project.module';
import { InterestModule } from './interest/interest.module';
import { UserSubjectModule } from './user-subject/user-subject.module';
import { ProjectSubjectModule } from './project-subject/project-subject.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';

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
    AuthModule,
    UserModule,
    NewsModule,
    SubjectModule,
    DonationHistoryModule,
    ProjectModule,
    InterestModule,
    UserSubjectModule,
    ProjectSubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
