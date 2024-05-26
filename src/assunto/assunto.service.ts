import { Injectable } from '@nestjs/common';
import { CreateAssuntoDto } from './dto/create-assunto.dto';
import { UpdateAssuntoDto } from './dto/update-assunto.dto';

@Injectable()
export class AssuntoService {
  create(createAssuntoDto: CreateAssuntoDto) {
    return 'This action adds a new assunto';
  }

  findAll() {
    return `This action returns all assunto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assunto`;
  }

  update(id: number, updateAssuntoDto: UpdateAssuntoDto) {
    return `This action updates a #${id} assunto`;
  }

  remove(id: number) {
    return `This action removes a #${id} assunto`;
  }
}
