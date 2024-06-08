import { Module } from '@nestjs/common';
import { DonationService } from './Donation.service';
import { DonationController } from './Donation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from 'src/entities/donation.entity';
import { Project } from 'src/entities/project.entity';
import { DonationHistory } from 'src/entities/donation-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, Project, DonationHistory])],
  controllers: [DonationController],
  providers: [DonationService],
})
export class DonationModule {}
