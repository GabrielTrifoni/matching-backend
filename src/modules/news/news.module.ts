import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { User } from 'src/entities/user.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { SharedModule } from 'src/shared/shared.module';
import { UserService } from '@modules/user/user.service';
import { Subject } from '@entities/subject.entity';
import { UserSubject } from '@entities/user-subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, User, Subject, UserSubject]),
    SharedModule,
  ],
  controllers: [NewsController],
  providers: [NewsService, UserService, RoleGuard],
})
export class NewsModule {}
