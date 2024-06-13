import { Module, forwardRef } from '@nestjs/common';
import { DonationService } from './Donation.service';
import { DonationController } from './Donation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from 'src/entities/donation.entity';
import { DonationHistoryModule } from '@modules/donation-history/donation-history.module';
import { ProjectModule } from '@modules/project/project.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Donation]),
    forwardRef(() => ProjectModule),
    forwardRef(() => DonationHistoryModule),
    forwardRef(() => UserModule),
  ],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService],
})
export class DonationModule {}
