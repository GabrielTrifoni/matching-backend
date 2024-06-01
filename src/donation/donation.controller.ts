import { Controller } from '@nestjs/common';
import { DonationService } from './Donation.service';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}
}
