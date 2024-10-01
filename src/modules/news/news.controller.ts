import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';

import { AuthUser } from 'src/decorators/user.decorator';
import { IAuthUser } from '@modules/auth/auth.service';
import {
  MyResponse,
  Paginated,
  Pagination,
  PaginationParams,
} from 'src/decorators/pagination.decorator';
import { News } from '@entities/news.entity';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '@modules/attachment/multer.config';
import { AttachmentService } from '@modules/attachment/attachments.service';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
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
  ): Promise<MyResponse<void>> {
    const dto = JSON.parse(data) as CreateNewsDto;
    const attachment = await this.attachmentService.saveFile(file) 
    await this.newsService.create(dto,  user.email, attachment);

    return {
      status: HttpStatus.CREATED,
      message: 'A divulgação foi criada com sucesso.',
    };
  }

  @Get()
  // @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  // @UseGuards(AuthGuard, RoleGuard)
  async findAll(
    @PaginationParams() params: Pagination,
  ): Promise<MyResponse<Paginated<News>>> {
    const news = await this.newsService.findAll(params);

    return {
      status: HttpStatus.OK,
      message: 'Divulgações obtidas com sucesso.',
      payload: news,
    };
  }

  @Get(':id')
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  async findOne(@Param('id') id: string): Promise<MyResponse<News>> {
    const news = await this.newsService.findOne(+id);

    return {
      status: HttpStatus.OK,
      message: 'Divulgação obtida com sucesso.',
      payload: news,
    };
  }

  @Patch(':id')
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    await this.newsService.update(+id, updateNewsDto);

    return {
      status: HttpStatus.OK,
      message: 'Divulgação atualizada com sucesso.',
    };
  }
}
