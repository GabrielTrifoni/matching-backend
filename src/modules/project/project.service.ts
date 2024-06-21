import { Project } from '@entities/project.entity';
import { IAuthUser } from '@modules/auth/auth.service';
import { CreateInterestDto } from '@modules/interest/dto/create-interest.dto';
import { InterestService } from '@modules/interest/interest.service';
import { ProjectSubjectService } from '@modules/project-subject/project-subject.service';
import { UserService } from '@modules/user/user.service';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated, Pagination } from 'src/decorators/pagination.decorator';
import { ProjectStatus } from 'src/enums/project-status.enum';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';
import { SubjectService } from '@modules/subject/subject.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(forwardRef(() => ProjectSubjectService))
    private readonly projectSubjectService: ProjectSubjectService,
    @Inject(forwardRef(() => InterestService))
    private readonly interestService: InterestService,
    @Inject(forwardRef(() => InterestService))
    private readonly subjectService: SubjectService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateProjectDto, user: IAuthUser) {
    const supervisor = await this.userService.findOne(dto.supervisor);

    const newProject = {
      ...dto,
      startDate: new Date(),
      supervisor,
      status: ProjectStatus.UNDER_ANALYSIS.toUpperCase(),
    } as DeepPartial<Project>;

    const project = await this.projectRepository.save(newProject);

    await this.projectSubjectService.associateWithSubjectInCreation(
      project.id,
      dto.subjects,
    );

    const newInterest: CreateInterestDto = {
      reason: 'Usuário propositor do projeto.',
      project: project.id,
    };

    await this.interestService.create(newInterest, user);
  }

  async findAll(pagination: Pagination, query: QueryProjectDto) {
    const { page, limit, size, offset } = pagination;
    const { status } = query;

    const [data, total] = await this.projectRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        startDate: 'DESC',
      },
      where: {
        status: (status && status.toUpperCase()) as ProjectStatus,
      },
      relations: ['interests', 'subjects', 'subjects.subject'],
    });

    return { totalPages: Math.ceil(total / size), items: data, page, size };
  }

  async findAllByUserSubjects(
    pagination: Pagination,
    query: QueryProjectDto,
    { email }: IAuthUser,
  ): Promise<Paginated<Project>> {
    const { page, limit, size, offset } = pagination;
    const { slots, status } = query;

    const user = await this.userService.findOne(email);

    const [data, total] = await this.projectRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        startDate: 'DESC',
      },
      where: {
        subjects: user.subjects,
        status: (status && status.toUpperCase()) as ProjectStatus,
      },
      relations: ['interests', 'subjects', 'subjects.subject'],
    });

    const projects =
      slots === 'with_slot'
        ? data.filter((p) => p.interests.length < p.slots)
        : data.filter((p) => p.interests.length === p.slots);

    return { totalPages: Math.ceil(total / size), items: projects, page, size };
  }

  async approveProjectById(projectId: number) {
    const project = await this.findOneById(projectId);

    if (project.status === ProjectStatus.DISAPPROVED.toUpperCase()) {
      throw new ConflictException('O projeto foi reprovado');
    } else if (project.status !== ProjectStatus.UNDER_ANALYSIS.toUpperCase()) {
      throw new ConflictException('O projeto não está em análise');
    }

    const approvedProject = {
      ...project,
      status: ProjectStatus.APPROVED.toUpperCase(),
    } as DeepPartial<Project>;

    await this.projectRepository.save(approvedProject);
  }

  async disapproveProjectById(projectId: number) {
    const project = await this.findOneById(projectId);

    if (project.status === ProjectStatus.APPROVED.toUpperCase()) {
      throw new ConflictException('O projeto foi aprovado');
    } else if (project.status !== ProjectStatus.UNDER_ANALYSIS.toUpperCase()) {
      throw new ConflictException('O projeto não está em análise');
    }

    const disapprovedProject = {
      ...project,
      status: ProjectStatus.DISAPPROVED.toUpperCase(),
    } as DeepPartial<Project>;

    await this.projectRepository.save(disapprovedProject);
  }

  async changeProjectStatusToInProgress(projectId: number) {
    const project = await this.findOneById(projectId);

    if (project.status !== ProjectStatus.APPROVED.toUpperCase()) {
      throw new ConflictException('O projeto não está com status de aprovado');
    }

    const inProgressProject = {
      ...project,
      status: ProjectStatus.IN_PROGRESS.toUpperCase(),
    } as DeepPartial<Project>;

    await this.projectRepository.save(inProgressProject);
  }

  async changeProjectStatusToConcluded(projectId: number) {
    const project = await this.findOneById(projectId);

    if (project.status !== ProjectStatus.IN_PROGRESS.toUpperCase()) {
      throw new ConflictException('O projeto não está com status em andamento');
    }

    const concludedProject = {
      ...project,
      status: ProjectStatus.CONCLUDED.toUpperCase(),
    } as DeepPartial<Project>;

    await this.projectRepository.save(concludedProject);
  }

  async findOneById(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['supervisor', 'subjects'],
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return project;
  }

  async findAllBySupervisor(user: IAuthUser) {
    const supervisor = await this.userService.findOne(user.email);

    if (!supervisor) {
      throw new NotFoundException('Supervisor não encontrado.');
    }

    const projects = await this.projectRepository.find({
      where: {
        supervisor: supervisor,
      },
    });

    return projects;
  }

  async findAllByStudent(user: IAuthUser) {
    const student = await this.userService.getUserDetails(user.email);

    if (!student) {
      throw new NotFoundException('Supervisor não encontrado.');
    }

    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.interests', 'interest')
      .where('interest.user_id = :studentId', { studentId: student.id })
      .andWhere('interest.status = :status', { status: 'APROVADO' })
      .getMany();

    return projects;
  }

  async getProjectSubjectNames(projectID: number) {
    const project = await this.findOneById(projectID);

    if (!project) {
      throw new NotFoundException('Nenhum projeto encontrado!');
    }

    const subjectsResultList = new Array<string>();

    if (!project.subjects) {
      throw new NotFoundException(
        'Este projeto não possui subjects vinculados',
      );
    }

    for (const subject of project.subjects) {
      const result = await this.projectSubjectService.findOne(subject.id);
      subjectsResultList.push(result.subject.subject);
    }

    return subjectsResultList;
  }

  //TODO: check project as concluded
}
