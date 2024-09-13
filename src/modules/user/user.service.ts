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
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const bio = dto.bio ? dto.bio : user.bio;
    const cpf = dto.cpf ? dto.cpf : user.cpf;
    const password = dto.password
      ? await bcrypt.hash(dto.password, this.saltRounds)
      : user.password;
    const fullname = dto.fullname ? dto.fullname : user.fullname;
    const phone = dto.phone ? dto.phone : user.phone;
    const email = dto.email ? dto.email : user.email;

    const updatedUser = {
      id: user.id,
      cpf,
      email,
      password,
      fullname,
      phone,
      bio,
      role: user.role,
    } as DeepPartial<User>;

    await this.delete(id);

    await this.userRepository.save(updatedUser);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.remove(user);
  }
}
