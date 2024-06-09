import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { Repository } from 'typeorm';
import { Interest } from '@entities/interest.entity';
// import { UserService } from '@modules/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated, Pagination } from 'src/decorators/pagination.decorator';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>,
    // private readonly userService: UserService,
    // private readonly projetoService: ProjectService,
  ) {}

  @Post()
  async create(createInterestDto: CreateInterestDto) {
    const { reason } = createInterestDto;

    await this.interestRepository.save({
      reason: reason,
      status: 'ativo',
    });
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
