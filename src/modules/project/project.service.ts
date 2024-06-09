import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Project } from '@entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@modules/user/user.service';
import { IAuthUser } from '@modules/auth/auth.service';
import { ProjectSubjectService } from '@modules/project-subject/project-subject.service';
import { InterestService } from '@modules/interest/interest.service';
import { CreateInterestDto } from '@modules/interest/dto/create-interest.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
    private readonly projectSubjectService: ProjectSubjectService,
    private readonly interestService: InterestService,
  ) {}

  async create(dto: CreateProjectDto, user: IAuthUser) {
    const supervisor = await this.userService.findOne(dto.supervisor);

    const newProject = {
      ...dto,
      startDate: new Date(),
      supervisor,
    } as DeepPartial<Project>;

    const project = await this.projectRepository.save(newProject);

    this.projectSubjectService.associateWithSubjectInCreation(
      project.id,
      dto.subjects,
    );

    const newInterest: CreateInterestDto = {
      reason: 'Usuário propositor do projeto.',
      project: project.id,
    };

    await this.interestService.create(newInterest, user);
  }

  findAll() {
    return `This action returns all Project`;
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} Project`;
  }

  remove(id: number) {
    return `This action removes a #${id} Project`;
  }
}
