import { Module, forwardRef } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Donation } from 'src/entities/donation.entity';
import { Interest } from 'src/entities/interest.entity';
import { ProjectSubject } from 'src/entities/project-subject.entity';
import { User } from 'src/entities/user.entity';
import { InterestModule } from '@modules/interest/interest.module';
import { UserModule } from '@modules/user/user.module';
import { ProjectSubjectModule } from '@modules/project-subject/project-subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => InterestModule),
    forwardRef(() => ProjectSubjectModule),
    UserModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
