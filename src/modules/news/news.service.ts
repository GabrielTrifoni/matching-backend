import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { Repository } from 'typeorm';
import { IAuthUser } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/user.service';

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

  findAll() {
    return `This action returns all News`;
  }

  findOne(id: number) {
    return `This action returns a #${id} News`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} News`;
  }
}
