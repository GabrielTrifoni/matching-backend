import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';
import { ProjectSubject } from 'src/entities/project-subject.entity';
import { Project } from 'src/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, ProjectSubject, Project])],
})
export class ProjectSubjectModule {}
