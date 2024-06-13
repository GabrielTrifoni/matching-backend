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
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  MyResponse,
  Paginated,
  Pagination,
  PaginationParams,
} from 'src/decorators/pagination.decorator';
import { Project } from '@entities/project.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

import { AuthUser } from 'src/decorators/user.decorator';
import { IAuthUser } from '@modules/auth/auth.service';
import { UserRole } from 'src/enums/role.enum';
import { QueryProjectDto } from './dto/query-project.dto';

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
  async findAll(
    @PaginationParams() params: Pagination,
    @Query() query: QueryProjectDto,
  ): Promise<MyResponse<Project[]>> {
    const items = await this.projectService.findAll(params, query);

    const { items: projects } = items;

    return {
      message: `Foram recuperados ${projects.length} projetos`,
      status: HttpStatus.OK,
      payload: projects,
    };
  }

  @Get('/byUser')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async findAllByUserSubjects(
    @PaginationParams() params: Pagination,
    @AuthUser() user: IAuthUser,
  ): Promise<MyResponse<Paginated<Project>>> {
    const items = await this.projectService.findAllByUserSubjects(params, user);

    const { items: projects } = items;

    return {
      message: `Foram recuperados ${projects.length} projetos`,
      status: HttpStatus.OK,
      payload: items,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MyResponse<Project>> {
    const project = await this.projectService.findOneById(+id);

    return {
      status: HttpStatus.OK,
      message: 'Projeto recuperado com sucesso',
      payload: project,
    };
  }

  @Patch(':id/approve')
  async approveProject(@Param('id') id: string): Promise<MyResponse<Project>> {
    await this.projectService.approveProjectById(+id);

    return {
      message: `Projeto aprovado com sucesso`,
      status: HttpStatus.OK,
    };
  }

  @Patch(':id/disapprove')
  async disapproveProject(
    @Param('id') id: string,
  ): Promise<MyResponse<Project>> {
    await this.projectService.disapproveProjectById(+id);

    return {
      message: `Projeto reprovado com sucesso`,
      status: HttpStatus.OK,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectService.update(+id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectService.remove(+id);
  // }
}
