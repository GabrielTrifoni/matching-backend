import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { NewsModule } from './modules/news/news.module';
import { DonationHistoryModule } from './modules/donation-history/donation-history.module';
import { ProjectModule } from './modules/project/project.module';
import { InterestModule } from './modules/interest/interest.module';
import { UserSubjectModule } from './modules/user-subject/user-subject.module';
import { ProjectSubjectModule } from './modules/project-subject/project-subject.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubjectModule } from './modules/subject/subject.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

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
    SharedModule,
    UserModule,
    NewsModule,
    SubjectModule,
    DonationHistoryModule,
    ProjectModule,
    InterestModule,
    UserSubjectModule,
    ProjectSubjectModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
