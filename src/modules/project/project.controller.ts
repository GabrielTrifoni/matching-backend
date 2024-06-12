import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MyResponse } from 'src/decorators/pagination.decorator';
import { Project } from '@entities/project.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

import { AuthUser } from 'src/decorators/user.decorator';
import { IAuthUser } from '@modules/auth/auth.service';
import { UserRole } from 'src/enums/role.enum';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async create(
    @Body() dto: CreateProjectDto,
    @AuthUser() user: IAuthUser,
  ): Promise<MyResponse<Project>> {
    await this.projectService.create(dto, user);

    return {
      status: HttpStatus.CREATED,
      message: 'Projeto criado com sucesso',
    };
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
