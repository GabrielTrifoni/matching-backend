import { Subject } from '@entities/subject.entity';
import { UserSubject } from '@entities/user-subject.entity';
import { UserWithSubjectDto } from '@modules/user/dto/user-subject.dto';
import { UserService } from '@modules/user/user.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';

@Injectable()
export class UserSubjectService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(UserSubject)
    private readonly userSubjectRepository: Repository<UserSubject>,
  ) {}

  async associateWithSubject(dto: UserWithSubjectDto) {
    const user = await this.userService.findOne(dto.email);

    const subjects = await this.subjectRepository.findBy({
      id: In(dto.subjects),
    });

    if (dto.subjects.length > subjects.length) {
      throw new NotFoundException('Existem assuntos não correspondentes.');
    }

    const userSubjects = subjects.map(
      (subject) =>
        ({
          subject,
          user,
        }) as DeepPartial<UserSubject>,
    );

    const userSubject = await this.userSubjectRepository.find({
      where: { user, subject: In(dto.subjects) },
    });

    if (userSubject.length > 0) {
      throw new ConflictException('Associações solicitadas já existem.');
    }

    await this.userSubjectRepository.save(userSubjects);
  }

  async dissociateWithSubject(dto: UserWithSubjectDto) {
    const user = await this.userService.findOne(dto.email);

    const subjects = await this.subjectRepository.findBy({
      id: In(dto.subjects),
    });

    if (dto.subjects.length > subjects.length) {
      throw new NotFoundException('Existem assuntos não correspondentes.');
    }

    await this.userSubjectRepository.delete({
      user,
      subject: In(dto.subjects),
    });
  }
}
