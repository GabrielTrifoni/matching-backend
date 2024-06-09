import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { DonationService } from './Donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { MyResponse } from 'src/decorators/pagination.decorator';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async create(@Body() dto: CreateDonationDto): Promise<MyResponse<void>> {
    return {
      status: HttpStatus.CREATED,
      message: 'Doação habilitada com sucesso.',
    };
  }
}
