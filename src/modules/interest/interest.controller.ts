import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import {
  MyResponse,
  Paginated,
  Pagination,
  PaginationParams,
} from 'src/decorators/pagination.decorator';
import { Interest } from '@entities/interest.entity';

@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  create(@Body() createInterestDto: CreateInterestDto) {
    this.interestService.create(createInterestDto);

    return {
      status: HttpStatus.OK,
      message: 'O interesse foi criado com sucesso.',
    };
  }

  @Get()
  async findAll(
    @PaginationParams() params: Pagination,
  ): Promise<MyResponse<Paginated<Interest>>> {
    const interests = await this.interestService.findAll(params);

    return {
      status: HttpStatus.OK,
      message: 'Interesses obtidos com sucesso.',
      payload: interests,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const interest = this.interestService.findOne(+id);

    return {
      status: HttpStatus.OK,
      message: 'Interesse obtido com sucesso.',
      payload: interest,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterestDto: UpdateInterestDto,
  ) {
    return this.interestService.update(+id, updateInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestService.remove(+id);
  }
}
