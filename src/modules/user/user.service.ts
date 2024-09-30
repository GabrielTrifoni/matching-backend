import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/enums/role.enum';
import { Subject } from '@entities/subject.entity';
import { UserSubject } from '@entities/user-subject.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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
  ) { }

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

  async findAll() {
    const users = await this.userRepository.find();
    return users;
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

  async getUserDetails(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['subjects', 'subjects.subject', 'interests'],
    });

    delete user.password;
    // delete user.role;

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

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.bio !== undefined) {
      user.bio = dto.bio;
    }
    if (dto.cpf !== undefined) {
      user.cpf = dto.cpf;
    }
    if (dto.password !== undefined) {
      user.password = await bcrypt.hash(dto.password, this.saltRounds);
    }
    if (dto.fullname !== undefined) {
      user.fullname = dto.fullname;
    }
    if (dto.phone !== undefined) {
      user.phone = dto.phone;
    }
    if (dto.email !== undefined) {
      user.email = dto.email;
    }

    await this.userRepository.save(user);
  }


  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.remove(user);
  }
}
