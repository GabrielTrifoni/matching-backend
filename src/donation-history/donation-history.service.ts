import { Injectable } from '@nestjs/common';
import { CreateDonationHistoryDto } from './dto/create-donation-history.dto';
import { UpdateDonationHistoryDto } from './dto/update-donation-history.dto';

@Injectable()
export class DonationHistoryService {
  create(createDonationHistoryDto: CreateDonationHistoryDto) {
    return 'This action adds a new DonationHistory';
  }

  findAll() {
    return `This action returns all DonationHistory`;
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
