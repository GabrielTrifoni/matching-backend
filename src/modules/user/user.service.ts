import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/enums/role.enum';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  // async associateWithSubjects({ email, subjectIds }: AssociateWithSubjectDto) {
  //   const user = this.findOne(email);

  //   const subjects = await this.subjectService.findByIds(subjectIds);
  // }

  update(id: number) {
    return `This action updates a #${id} User`;
  }

  remove(id: number) {
    return `This action removes a #${id} User`;
  }
}
