import { ProjectSubject } from '@entities/project-subject.entity';
import { Subject } from '@entities/subject.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { ProjectWithSubjectsDto } from './dto/project-subject.dto';
import { ProjectService } from '@modules/project/project.service';

@Injectable()
export class ProjectSubjectService {
  constructor(
    private readonly projectService: ProjectService,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(ProjectSubject)
    private readonly projectSubjectRepository: Repository<ProjectSubject>,
  ) {}

  async associateWithSubjectInCreation(project: number, subjects: number[]) {
    const subjectsFound = await this.mapSubjects(subjects);

    const projectSubjects = subjectsFound.map(
      (subject) =>
        ({
          project,
          subject: subject.id,
        }) as DeepPartial<ProjectSubject>,
    );

    await this.projectSubjectRepository.save(projectSubjects);
  }

  async associateWithSubject(dto: ProjectWithSubjectsDto) {
    const project = await this.projectService.findOne(dto.project);

    const subjectsFound = await this.mapSubjects(dto.subjects);

    const newProjectSubjects = subjectsFound.map(
      (subject) =>
        ({
          project,
          subject: subject.id,
        }) as DeepPartial<ProjectSubject>,
    );

    const projectSubjects = await this.projectSubjectRepository.find({
      where: { project, subject: In(dto.subjects) },
    });

    if (projectSubjects.length > 0) {
      throw new ConflictException('Associações solicitadas já existem.');
    }

    await this.projectSubjectRepository.save(newProjectSubjects);
  }

  async dissociateWithSubject(dto: ProjectWithSubjectsDto) {
    const project = await this.projectService.findOne(dto.project);
    await this.mapSubjects(dto.subjects);

    await this.projectSubjectRepository.delete({
      project,
      subject: In(dto.subjects),
    });
  }

  private async mapSubjects(subjects: number[]) {
    const subjectsFound = await this.subjectRepository.findBy({
      id: In(subjects),
    });

    if (subjects.length > subjectsFound.length) {
      throw new NotFoundException('Existem assuntos não correspondentes.');
    }

    return subjectsFound;
  }
}
