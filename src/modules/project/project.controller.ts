import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
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
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '@modules/attachment/multer.config';
import { AttachmentService } from '@modules/attachment/attachments.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly attachmentService: AttachmentService
  ) {}

  @Post()
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('cover', multerConfig))
  async create(
    @Body('data') data: string,
    @AuthUser() user: IAuthUser,
    @UploadedFile() file: Express.MulterS3.File
  ): Promise<MyResponse<Project>> {
    const dto = JSON.parse(data) as CreateProjectDto;
    const attachment = await this.attachmentService.saveFile(file)

    await this.projectService.create(dto, user, attachment);

    return {
      status: HttpStatus.CREATED,
      message: 'Projeto criado com sucesso',
    };
  }

  @Get()
  async findAll(
    @PaginationParams() params: Pagination,
    @Query() query: QueryProjectDto,
  ): Promise<MyResponse<Paginated<Project>>> {
    const items = await this.projectService.findAll(params, query);

    const { items: data } = items;

    return {
      message: `Foram recuperados ${data.length} projetos`,
      status: HttpStatus.OK,
      payload: items,
    };
  }

  @Get('/byUser')
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  async findAllByUserSubjects(
    @PaginationParams() params: Pagination,
    @Query() query: QueryProjectDto,
    @AuthUser() user: IAuthUser,
  ): Promise<MyResponse<Paginated<Project>>> {
    const items = await this.projectService.findAllByUserSubjects(
      params,
      query,
      user,
    );

    const { items: projects } = items;

    return {
      message: `Foram recuperados ${projects.length} projetos`,
      status: HttpStatus.OK,
      payload: items,
    };
  }

  @Get('/supervisor')
  @Roles(UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  async findAllBySupervisor(
    @AuthUser() user: IAuthUser,
  ): Promise<MyResponse<Project[]>> {
    const projects = await this.projectService.findAllBySupervisor(user);

    return {
      status: HttpStatus.OK,
      message: 'Projetos recuperado com sucesso',
      payload: projects,
    };
  }

  @Get('/student')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async findAllByStudent(
    @AuthUser() user: IAuthUser,
  ): Promise<MyResponse<Project[]>> {
    const projects = await this.projectService.findAllByStudent(user);

    return {
      status: HttpStatus.OK,
      message: 'Projetos recuperado com sucesso',
      payload: projects,
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

  @Get(':id/subjects')
  async getProjectSubjects(
    @Param('id') id: string,
  ): Promise<MyResponse<string[]>> {
    const subjects = await this.projectService.getProjectSubjectNames(+id);

    return {
      status: HttpStatus.OK,
      message: 'Projeto recuperado com sucesso',
      payload: subjects,
    };
  }

  @Roles(UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id/approve')
  async approveProject(@Param('id') id: string): Promise<MyResponse<Project>> {
    await this.projectService.approveProjectById(+id);

    return {
      message: `Projeto aprovado com sucesso`,
      status: HttpStatus.OK,
    };
  }

  @Roles(UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
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

  @Roles(UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id/start')
  async changeStatusToInProgress(
    @Param('id') id: string,
  ): Promise<MyResponse<Project>> {
    await this.projectService.changeProjectStatusToInProgress(+id);

    return {
      message: `Projeto iniciado com sucesso`,
      status: HttpStatus.OK,
    };
  }

  @Roles(UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id/conclude')
  async changeStatusToConcluded(
    @Param('id') id: string,
  ): Promise<MyResponse<Project>> {
    await this.projectService.changeProjectStatusToConcluded(+id);

    return {
      message: `Projeto concluído com sucesso`,
      status: HttpStatus.OK,
    };
  }
  // <<<<<<< Updated upstream

  //   // @Patch(':id')
  //   // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   //   return this.projectService.update(+id, updateProjectDto);
  //   // }

  //   // @Delete(':id')
  //   // remove(@Param('id') id: string) {
  //   //   return this.projectService.remove(+id);
  //   // }
  // =======
  // >>>>>>> Stashed changes
}
