import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Injectable()
export class InterestService {
  create(createInterestDto: CreateInterestDto) {
    return 'This action adds a new interesse';
  }

  findAll() {
    return `This action returns all interesse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interesse`;
  }

  update(id: number, updateInterestDto: UpdateInterestDto) {
    return `This action updates a #${id} interesse`;
  }

  remove(id: number) {
    return `This action removes a #${id} interesse`;
  }
}
