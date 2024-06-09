import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from 'src/entities/interest.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { ProjectService } from '@modules/project/project.service';
import { UserService } from '@modules/user/user.service';
import { RoleGuard } from 'src/guards/role.guard';
import { SharedModule } from 'src/shared/shared.module';
import { ProjectModule } from '@modules/project/project.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Interest, Project, User])],
  controllers: [InterestController],
  providers: [InterestService, ProjectService, UserService],
  exports: [InterestService],
})
export class InterestModule {}
