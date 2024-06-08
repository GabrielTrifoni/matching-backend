import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { AuthUser } from 'src/decorators/user.decorator';
import { IAuthUser } from '@modules/auth/auth.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  @UseFilters(new HttpExceptionFilter())
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @AuthUser() user: IAuthUser,
  ) {
    await this.newsService.create(createNewsDto, user.email);

    return {
      status: HttpStatus.CREATED,
      message: 'A divulgação foi criada com sucesso.',
    };
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }
}
