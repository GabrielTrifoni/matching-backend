import { Module } from '@nestjs/common';
import { UserSubject } from '@entities/user-subject.entity';
import { Subject } from 'src/entities/subject.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserSubject, Subject, User])],
})
export class UserSubjectModule {}
