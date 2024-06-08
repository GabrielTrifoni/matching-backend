import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Donation } from 'src/entities/donation.entity';
import { Interest } from 'src/entities/interest.entity';
import { ProjectSubject } from 'src/entities/project-subject.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Donation,
      Interest,
      ProjectSubject,
      User,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
