import { Module } from '@nestjs/common';
import { UserSubject } from '@entities/user-subject.entity';
import { Subject } from 'src/entities/subject.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { UserSubjectsController } from './user-subject.controller';
import { UserSubjectService } from './user-subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSubject, Subject, User]), UserModule],
  controllers: [UserSubjectsController],
  providers: [UserSubjectService],
})
export class UserSubjectModule {}
