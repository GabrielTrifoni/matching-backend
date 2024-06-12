import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { User } from 'src/entities/user.entity';
import { Subject } from '@entities/subject.entity';
import { UserSubject } from '@entities/user-subject.entity';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, User, Subject, UserSubject]),
    UserModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
