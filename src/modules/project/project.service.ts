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
import { UpdateProjectDto } from './dto/update-project.dto';
import { InterestStatus } from 'src/enums/interest-status.enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(forwardRef(() => ProjectSubjectService))
    private readonly projectSubjectService: ProjectSubjectService,
    @Inject(forwardRef(() => InterestService))
    private readonly interestService: InterestService,
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
    const { slots, status } = query;

    const [data, total] = await this.projectRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        startDate: 'DESC',
      },
      where: {
        status: (status && status.toUpperCase()) as ProjectStatus,
      },
      relations: ['interests'],
    });

    const projects =
      slots === 'with_slot'
        ? data.filter((p) => p.interests.length < p.slots)
        : data.filter((p) => p.interests.length === p.slots);

    return { total, items: projects, page, size };
  }

  async findAllByUserSubjects(
    pagination: Pagination,
    { email }: IAuthUser,
  ): Promise<Paginated<Project>> {
    const { page, limit, size, offset } = pagination;

    const user = await this.userService.findOne(email);

    const [data, total] = await this.projectRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        startDate: 'DESC',
      },
      relations: ['interests'],
      where: {
        subjects: user.subjects,
        status: ProjectStatus.APPROVED.toUpperCase() as ProjectStatus,
      },
    });

    data.forEach((item) => {
      item.interests = item.interests.filter(
        (interest) => interest.status === InterestStatus.APPROVED,
      );
    });
    const projects = data.filter((p) => p.interests.length < p.slots);

    return { total, items: projects, page, size };
  }

  async approveProjectById(projectId: number) {
    const project = await this.findOneById(projectId);

    if (project.status === ProjectStatus.DISAPPROVED.toUpperCase()) {
      throw new ConflictException('O projeto foi reprovado');
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
    }

    const disapprovedProject = {
      ...project,
      status: ProjectStatus.DISAPPROVED.toUpperCase(),
    } as DeepPartial<Project>;

    await this.projectRepository.save(disapprovedProject);
  }

  async findOneById(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
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

  //TODO: check project as concluded
}
