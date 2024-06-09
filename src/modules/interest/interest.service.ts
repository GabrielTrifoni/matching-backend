import { Injectable, NotFoundException, Post } from '@nestjs/common';
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

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(createInterestDto: CreateInterestDto, { email }: IAuthUser) {
    const { project: id, reason } = createInterestDto;

    const user = await this.userService.findOne(email);
    const project = await this.projectService.findOne(id);

    await this.interestRepository.save({
      reason: reason,
      status: InterestStatus.UNDER_ANALYSIS,
      user,
      project,
    } as DeepPartial<Interest>);
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

    return { total, items: interests, page, size };
  }

  async findOne(id: number): Promise<Interest | NotFoundException> {
    const interest = await this.interestRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!interest) {
      return new NotFoundException('Interesse não encontrado.');
    }

    return interest;
  }

  update(id: number, updateInterestDto: UpdateInterestDto) {
    return `This action updates a #${id} interesse`;
  }

  remove(id: number) {
    return `This action removes a #${id} interesse`;
  }
}
