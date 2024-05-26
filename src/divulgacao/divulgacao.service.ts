import { Injectable } from '@nestjs/common';
import { CreateDivulgacaoDto } from './dto/create-divulgacao.dto';
import { UpdateDivulgacaoDto } from './dto/update-divulgacao.dto';

@Injectable()
export class DivulgacaoService {
  create(createDivulgacaoDto: CreateDivulgacaoDto) {
    return 'This action adds a new Divulgacao';
  }

  findAll() {
    return `This action returns all Divulgacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Divulgacao`;
  }

  update(id: number, updateDivulgacaoDto: UpdateDivulgacaoDto) {
    return `This action updates a #${id} Divulgacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} Divulgacao`;
  }
}
