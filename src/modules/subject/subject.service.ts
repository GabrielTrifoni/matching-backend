import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from 'src/entities/subject.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  @Roles(UserRole.SYSTEM_ADMIN)
  async create(newSubject: CreateSubjectDto) {
    await this.subjectRepository.save(newSubject);
  }

  async findAll() {
    const subjects = await this.subjectRepository.find({
      relations: ['projectSubject'],
    });

    return subjects ?? [];
  }

  async findByIds(ids: number[]) {
    return await this.subjectRepository
      .createQueryBuilder('Subject')
      .where('subject.id IN (:...ids)', { ids })
      .getMany();
  }

  async findOne(id: number) {
    const subject = await this.subjectRepository.findOne({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Assunto não encontrado.');
    }

    return subject;
  }

  async update(id: number, dto: UpdateSubjectDto) {
    const subject = await this.subjectRepository.findOne({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Assunto não encontrado.');
    }

    subject.subject = dto.subject;

    return this.subjectRepository.save(subject);
  }

  remove(id: number) {
    return `This action removes a #${id} Subject`;
  }
}
