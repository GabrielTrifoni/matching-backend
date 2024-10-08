import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectSubjectService } from './project-subject.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

import { ProjectWithSubjectsDto } from './dto/project-subject.dto';

@Controller('project/subjects')
export class ProjectSubjectController {
  constructor(private readonly projectSubjectsService: ProjectSubjectService) {}

  @Post()
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  async associate(@Body() dto: ProjectWithSubjectsDto) {
    await this.projectSubjectsService.associateWithSubject(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Os assuntos foram associados com sucesso.',
    };
  }

  @Get()
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  async findOneByID(id: number) {
    const result = await this.projectSubjectsService.findOne(id);

    return {
      status: HttpStatus.OK,
      message: 'Project-Subject recuperado com sucesso',
      payload: result,
    };
  }

  @Delete()
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  async disassociate(@Body() dto: ProjectWithSubjectsDto) {
    await this.projectSubjectsService.dissociateWithSubject(dto);

    return {
      status: HttpStatus.OK,
      message: 'Os assuntos foram dissociados com sucesso.',
    };
  }
}
