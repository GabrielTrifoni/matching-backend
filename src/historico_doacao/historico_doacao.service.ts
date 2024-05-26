import { Injectable } from '@nestjs/common';
import { CreateHistoricoDoacaoDto } from './dto/create-historico_doacao.dto';
import { UpdateHistoricoDoacaoDto } from './dto/update-historico_doacao.dto';

@Injectable()
export class HistoricoDoacaoService {
  create(createHistoricoDoacaoDto: CreateHistoricoDoacaoDto) {
    return 'This action adds a new historicoDoacao';
  }

  findAll() {
    return `This action returns all historicoDoacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historicoDoacao`;
  }

  update(id: number, updateHistoricoDoacaoDto: UpdateHistoricoDoacaoDto) {
    return `This action updates a #${id} historicoDoacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} historicoDoacao`;
  }
}
