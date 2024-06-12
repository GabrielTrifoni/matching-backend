import { Donation } from '@entities/donation.entity';
import { ProjectService } from '@modules/project/project.service';
import { UserService } from '@modules/user/user.service';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { DonationHistoryService } from '@modules/donation-history/donation-history.service';
import { ProjectStatus } from 'src/enums/project-status.enum';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
    @Inject(forwardRef(() => DonationHistoryService))
    private readonly donationHistoryService: DonationHistoryService,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(createDonationDto: CreateDonationDto) {
    const { projectId, expected } = createDonationDto;

    const project = this.projectService.findOne(projectId);

    if (!project) {
      throw new NotFoundException('Projeto para doação não encontrado');
    }

    if ((await project).status === ProjectStatus.UNDER_ANALYSIS) {
      throw new ConflictException(
        'Projeto com status Em Análise não pode receber doações',
      );
    }

    if (expected <= 0) {
      throw new BadRequestException(
        'Valor a ser doado deve ser maior que R$0,00',
      );
    }

    const openingDate = new Date();
    const closureDate = new Date();

    closureDate.setFullYear(openingDate.getFullYear() + 1);

    // const donated = await this.donationHistoryService.findAllByDonations()
    // TODO: descobrir como pegar todos os donate history desse donate para somar os valores e colocar no atributo donated
    const newDonation = {
      expected: expected,
      project: project,
      opening: openingDate,
      closure: closureDate,
    } as DeepPartial<Donation>;

    await this.donationRepository.save(newDonation);
  }

  async findOne(id: number) {
    const donation = await this.donationRepository.find({
      where: {
        id: id,
      },
    });

    if (!donation) {
      throw new NotFoundException('Doação não encontrada.');
    }

    return donation;
  }
}
