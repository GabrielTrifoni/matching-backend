<<<<<<< Updated upstream
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UserService } from '@modules/user/user.service';
import { Paginated, Pagination } from 'src/decorators/pagination.decorator';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly userService: UserService,
  ) {}

  async create(createNewsDto: CreateNewsDto, createdBy: string) {
    const { title, description } = createNewsDto;

    const user = await this.userService.findOne(createdBy);

    await this.newsRepository.save({
      title,
      description,
      writtenDate: new Date(),
      modifiedDate: new Date(),
      user,
    });
  }

  async findAll(pagination: Pagination): Promise<Paginated<News>> {
    const { page, limit, size, offset } = pagination;

    const [news, total] = await this.newsRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        writtenDate: 'DESC',
      },
    });

    return { totalPages: total, items: news, page, size };
  }

  async findOne(id: number) {
    const news = await this.newsRepository.findOne({
      where: { id },
      select: {
        user: {
          email: true,
          fullname: true,
        },
      },
      relations: ['user'],
    });

    if (!news) {
      throw new NotFoundException('Divulgação não encontrada.');
    }

    return news;
  }

  async update(id: number, dto: UpdateNewsDto) {
    const news = await this.newsRepository.findOne({ where: { id } });

    if (!news) {
      throw new NotFoundException('Divulgação não encontrada');
    }

    const updatedNews = {
      id,
      ...dto,
      modifiedDate: new Date(),
    } as DeepPartial<News>;

    await this.newsRepository.save(updatedNews);
  }
}
=======
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UserService } from '@modules/user/user.service';
import { Paginated, Pagination } from 'src/decorators/pagination.decorator';
import { AttachmentService } from '@modules/attachment/attachments.service';
import { Attachment } from '@entities/attachments.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly userService: UserService, 
  ) {}

  async create(createNewsDto: CreateNewsDto, createdBy: string, attachment: Attachment) {
    const { title, description } = createNewsDto;

    const user = await this.userService.findOne(createdBy);

    await this.newsRepository.save({
      title,
      description,
      writtenDate: new Date(),
      modifiedDate: new Date(),
      user,
      attachment
    });
  }

  async findAll(pagination: Pagination): Promise<Paginated<News>> {
    const { page, limit, size, offset } = pagination;

    const [news, total] = await this.newsRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        writtenDate: 'DESC',
      },
      select: {
        attachment: {
          id: true,
          fileName: true,
          url: true,
        }
      },
      relations: ['attachment']
    });

    console.log(news);

    return { totalPages: total, items: news, page, size };
  }

  async findOne(id: number) {
    const news = await this.newsRepository.findOne({
      where: { id },
      select: {
        user: {
          email: true,
          fullname: true,
        },
        attachment: {
          id: true,
          fileName: true,
          url: true,
        }
      },
      relations: ['user', 'attachment'],
    });

    if (!news) {
      throw new NotFoundException('Divulgação não encontrada.');
    }

    return news;
  }

  async update(id: number, dto: UpdateNewsDto) {
    const news = await this.newsRepository.findOne({ where: { id } });

    if (!news) {
      throw new NotFoundException('Divulgação não encontrada');
    }

    const updatedNews = {
      id,
      ...dto,
      modifiedDate: new Date(),
    } as DeepPartial<News>;

    await this.newsRepository.save(updatedNews);
  }
}
>>>>>>> Stashed changes
