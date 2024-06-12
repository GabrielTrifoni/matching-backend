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
    const { transaction } = createDonationHistoryDto;
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const newDonationHistory = {
      transaction: transaction,
      transactionDate: new Date(),
      user: user,
      // donation?:
    } as DeepPartial<DonationHistory>;

    await this.donationHistoryRepository.save(newDonationHistory);
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

  findOne(id: number) {
    return `This action returns a #${id} DonationHistory`;
  }

  update(id: number, updateDonationHistoryDto: UpdateDonationHistoryDto) {
    return `This action updates a #${id} DonationHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} DonationHistory`;
  }
}
