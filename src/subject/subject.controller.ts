import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  UseFilters,
  Put,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from 'src/enums/role.enum';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @Roles(UserRoles.SYSTEM_ADMIN)
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() dto: CreateSubjectDto) {
    await this.subjectService.create(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Assunto criado com sucesso',
    };
  }

  @Get()
  findAll() {
    const subjects = this.subjectService.findAll();

    return {
      status: HttpStatus.OK,
      message: 'Assuntos obtidos com sucesso',
      subjects: subjects,
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
