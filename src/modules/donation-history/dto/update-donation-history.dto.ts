import { PartialType } from '@nestjs/mapped-types';
import { CreateDonationHistoryDto } from './create-donation-history.dto';

export class UpdateDonationHistoryDto extends PartialType(
  CreateDonationHistoryDto,
) {}
