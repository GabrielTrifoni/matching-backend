import { Module, forwardRef } from '@nestjs/common';
import { DonationHistoryService } from './donation-history.service';
import { DonationHistoryController } from './donation-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationHistory } from 'src/entities/donation-history.entity';
import { UserModule } from '@modules/user/user.module';
import { ProjectModule } from '@modules/project/project.module';
import { DonationModule } from '@modules/donation/donation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DonationHistory]),
    forwardRef(() => ProjectModule),
    forwardRef(() => UserModule),
    forwardRef(() => DonationModule),
  ],
  controllers: [DonationHistoryController],
  providers: [DonationHistoryService],
  exports: [DonationHistoryService],
})
export class DonationHistoryModule {}
