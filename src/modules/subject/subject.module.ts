import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '@entities/subject.entity';
import { ProjectSubject } from '@entities/project-subject.entity';
import { UserSubject } from '@entities/user-subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, ProjectSubject, UserSubject])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
