import { Module } from '@nestjs/common';
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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        migrations: ['migrations/*{.ts,.js}'],
        migrationsTableName: 'my_migrations',
        autoLoadEntities: true,
        synchronize: true,
      }),
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
