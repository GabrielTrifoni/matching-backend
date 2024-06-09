import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';
import { ProjectSubject } from 'src/entities/project-subject.entity';
import { Project } from 'src/entities/project.entity';
import { ProjectSubjectService } from './project-subject.service';
import { ProjectSubjectController } from './project-subject.controller';
import { ProjectModule } from '@modules/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject, ProjectSubject, Project]),
    ProjectModule,
  ],
  controllers: [ProjectSubjectController],
  providers: [ProjectSubjectService],
})
export class ProjectSubjectModule {}
