import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DivulgacaoService } from './divulgacao.service';
import { CreateDivulgacaoDto } from './dto/create-divulgacao.dto';
import { UpdateDivulgacaoDto } from './dto/update-divulgacao.dto';

@Controller('Divulgacao')
export class DivulgacaoController {
  constructor(private readonly divulgacaoService: DivulgacaoService) {}

  @Post()
  create(@Body() createDivulgacaoDto: CreateDivulgacaoDto) {
    return this.divulgacaoService.create(createDivulgacaoDto);
  }

  @Get()
  findAll() {
    return this.divulgacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divulgacaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDivulgacaoDto: UpdateDivulgacaoDto,
  ) {
    return this.divulgacaoService.update(+id, updateDivulgacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.divulgacaoService.remove(+id);
  }
}
