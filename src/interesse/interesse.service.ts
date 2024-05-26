import { Injectable } from '@nestjs/common';
import { CreateInteresseDto } from './dto/create-interesse.dto';
import { UpdateInteresseDto } from './dto/update-interesse.dto';

@Injectable()
export class InteresseService {
  create(createInteresseDto: CreateInteresseDto) {
    return 'This action adds a new interesse';
  }

  findAll() {
    return `This action returns all interesse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interesse`;
  }

  update(id: number, updateInteresseDto: UpdateInteresseDto) {
    return `This action updates a #${id} interesse`;
  }

  remove(id: number) {
    return `This action removes a #${id} interesse`;
  }
}
