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
import { RoleGuard } from 'src/guards/role.guard';
import { SharedModule } from 'src/shared/shared.module';

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
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService, RoleGuard],
  exports: [UserService],
})
export class UserModule {}
