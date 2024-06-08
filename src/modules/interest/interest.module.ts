import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from 'src/entities/interest.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interest, Project, User])],
  controllers: [InterestController],
  providers: [InterestService],
})
export class InterestModule {}
