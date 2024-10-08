import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
  forwardRef,
  ForbiddenException,
} from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Interest } from '@entities/interest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated, Pagination } from 'src/decorators/pagination.decorator';
import { InterestStatus } from 'src/enums/interest-status.enum';
import { UserService } from '@modules/user/user.service';
import { ProjectService } from '@modules/project/project.service';
import { IAuthUser } from '@modules/auth/auth.service';
import { UpdateInterestStatusDto } from './dto/update-interest-status.dto';
import { ProjectStatus } from 'src/enums/project-status.enum';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
  ) {}

  async create(createInterestDto: CreateInterestDto, { email }: IAuthUser) {
    const { project: id, reason } = createInterestDto;

    const user = await this.userService.findOne(email);
    const project = await this.projectService.findOneById(id);

    const interest = await this.interestRepository.findOne({
      where: { user, project },
    });

    if (interest) {
      throw new ConflictException('O interesse já foi criado');
    }

    const [, count] = await this.interestRepository.findAndCount({
      where: {
        project: project,
        status: InterestStatus.APPROVED.toUpperCase() as InterestStatus,
      },
    });

    if (project.status === ProjectStatus.IN_PROGRESS.toUpperCase()) {
      throw new ConflictException(
        'Esse projeto já está em andamento e não aceita novos interesses',
      );
    }

    if (project.slots === count) {
      throw new ForbiddenException(
        'Esse projeto já está com todas as vagas preenchidas',
      );
    }

    const newInterest = {
      reason,
      status: InterestStatus.UNDER_ANALYSIS,
      user,
      project,
    } as DeepPartial<Interest>;

    await this.interestRepository.save(newInterest);
  }

  async findAll(pagination: Pagination): Promise<Paginated<Interest>> {
    const { page, limit, size, offset } = pagination;

    const [interests, total] = await this.interestRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        reason: 'DESC',
      },
    });

    return { totalPages: total, items: interests, page, size };
  }

  //TODO: retornar todos os interesses de um determinado projeto
  async findAllByProjectId(id: number) {
    const project = await this.projectService.findOneById(id);

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const interests = await this.interestRepository.find({
      where: {
        project: project,
      },
      relations: ['user', 'project'],
    });

    return interests;
  }

  async findOne(id: number) {
    const interest = await this.interestRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!interest) {
      throw new NotFoundException('Interesse não encontrado.');
    }

    return interest;
  }

  async update(id: number, dto: UpdateInterestDto) {
    const interest = await this.findOne(id);

    const updatedInterest = {
      ...interest,
      ...dto,
    } as DeepPartial<Interest>;

    await this.interestRepository.save(updatedInterest);
  }

  async updateStatus(id: number, { status }: UpdateInterestStatusDto) {
    const interest = await this.findOne(id);

    if (interest.status === status) {
      throw new ConflictException('O status do interesse já foi atualizado');
    }

    const updatedInterestStatus = {
      ...interest,
      status,
    } as DeepPartial<Interest>;

    await this.interestRepository.save(updatedInterestStatus);
  }

  remove(id: number) {
    return `This action removes a #${id} interesse`;
  }
}
