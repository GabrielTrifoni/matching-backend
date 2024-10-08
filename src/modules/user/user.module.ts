import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Project } from 'src/entities/project.entity';
import { Interest } from 'src/entities/interest.entity';
import { UserSubject } from 'src/entities/user-subject.entity';
import { DonationHistory } from 'src/entities/donation-history.entity';
import { Subject } from '@entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSubject,
      Subject,
      Project,
      Interest,
      DonationHistory,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
