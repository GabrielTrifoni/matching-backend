import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  create(createNewsDto: CreateNewsDto) {
    return 'This action adds a new News';
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

  remove(id: number) {
    return `This action removes a #${id} News`;
  }
}
