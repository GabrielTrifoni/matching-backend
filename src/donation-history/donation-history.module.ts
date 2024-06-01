import { Module } from '@nestjs/common';
import { DonationHistoryService } from './donation-history.service';
import { DonationHistoryController } from './donation-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationHistory } from 'src/entities/donation-history.entity';
import { User } from 'src/entities/user.entity';
import { Donation } from 'src/entities/donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonationHistory, User, Donation])],
  controllers: [DonationHistoryController],
  providers: [DonationHistoryService],
})
export class DonationHistoryModule {}
