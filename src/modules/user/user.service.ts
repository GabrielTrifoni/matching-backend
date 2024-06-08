import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/enums/role.enum';
import { UserWithSubjectDto } from './dto/user-subject.dto';
import { Subject } from '@entities/subject.entity';
import { UserSubject } from '@entities/user-subject.entity';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(UserSubject)
    private readonly userSubjectRepository: Repository<UserSubject>,
  ) {}

  async create(newUser: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { cpf: newUser.cpf },
    });

    if (user) {
      throw new ConflictException('O usuário já existe.');
    }

    newUser.password = await bcrypt.hash(newUser.password, this.saltRounds);

    await this.userRepository.save({
      ...newUser,
      role: UserRole.STUDENT,
    });
  }

  findAll() {
    return `This action returns all User`;
  }

  async findOneWithSubjects(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['subjects', 'subjects.subject'],
      select: {
        password: false,
        role: false,
        subjects: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async associateWithSubject(dto: UserWithSubjectDto) {
    const user = await this.findOne(dto.email);

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
    const user = await this.findOne(dto.email);

    const subjects = await this.subjectRepository.findBy({
      id: In(dto.subjects),
    });

    if (dto.subjects.length > subjects.length) {
      throw new NotFoundException('Existem assuntos não correspondentes.');
    }

    await this.userSubjectRepository.delete({
      user: user,
      subject: In(dto.subjects),
    });
  }

  update(id: number) {
    return `This action updates a #${id} User`;
  }

  remove(id: number) {
    return `This action removes a #${id} User`;
  }
}
