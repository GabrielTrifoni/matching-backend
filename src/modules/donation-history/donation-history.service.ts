import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateDonationHistoryDto } from './dto/create-donation-history.dto';
import { UpdateDonationHistoryDto } from './dto/update-donation-history.dto';
import { DonationHistory } from '@entities/donation-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@modules/user/user.service';
import { ProjectService } from '@modules/project/project.service';
import { DeepPartial, Repository } from 'typeorm';
import { DonationService } from '@modules/donation/Donation.service';
import { IAuthUser } from '@modules/auth/auth.service';

@Injectable()
export class DonationHistoryService {
  constructor(
    @InjectRepository(DonationHistory)
    private readonly donationHistoryRepository: Repository<DonationHistory>,
    @Inject(forwardRef(() => DonationService))
    private readonly donationService: DonationService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
  ) {}

  async create(
    createDonationHistoryDto: CreateDonationHistoryDto,
    { email }: IAuthUser,
  ) {
    const { transaction, amount, donation } = createDonationHistoryDto;
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const donationObj = await this.donationService.findOne(donation);

    if (!donationObj) {
      throw new NotFoundException('Doação não encontrada.');
    }

    const newDonationHistory = {
      amount: amount,
      transaction: transaction,
      transactionDate: new Date(),
      user: user,
      donation: donationObj,
    } as DeepPartial<DonationHistory>;

    await this.donationHistoryRepository.save(newDonationHistory);

    await this.donationService.sumDonatedValues(donation);
  }

  async findAllByDonations(donationId: number) {
    const donation = await this.donationService.findOne(donationId);

    const donations = await this.donationHistoryRepository.find({
      where: {
        donation: donation,
      },
    });

    return donations;
  }

  async findAllByUser({ email }: IAuthUser) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const donations = await this.donationHistoryRepository.find({
      where: {
        user: user,
      },
    });

    return donations;
  }

  async findAllByProjectId(projectId: number) {
    const project = await this.projectService.findOneById(projectId);

    if (!project) {
      throw new NotFoundException('Projeto não encontrado.');
    }

    const donations = await this.donationHistoryRepository.find({
      where: {
        donation: project.donation,
      },
    });

    return donations;
  }
}
