import { Module, forwardRef } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { InterestModule } from '@modules/interest/interest.module';
import { UserModule } from '@modules/user/user.module';
import { ProjectSubjectModule } from '@modules/project-subject/project-subject.module';
import { SubjectModule } from '@modules/subject/subject.module';
import { AttachmentModule } from '@modules/attachment/attachments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => InterestModule),
    forwardRef(() => ProjectSubjectModule),
    forwardRef(() => SubjectModule),
    UserModule,
    AttachmentModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
