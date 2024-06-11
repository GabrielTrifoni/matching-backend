import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { MyResponse } from 'src/decorators/pagination.decorator';
import { Subject } from '@entities/subject.entity';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @Roles(UserRole.SYSTEM_ADMIN)
  async create(@Body() dto: CreateSubjectDto) {
    await this.subjectService.create(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Assunto criado com sucesso',
    };
  }

  @Get()
  async findAll(): Promise<MyResponse<Subject[]>> {
    const subjects = await this.subjectService.findAll();

    return {
      status: HttpStatus.OK,
      message: 'Assuntos obtidos com sucesso',
      payload: subjects,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subject = await this.subjectService.findOne(+id);

    return {
      status: HttpStatus.OK,
      message: 'Assunto obtido com sucesso',
      subject,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    const subject = await this.subjectService.update(+id, updateSubjectDto);

    return {
      status: HttpStatus.OK,
      message: 'Assunto atualizado com sucesso',
      subject,
    };
  }
}
