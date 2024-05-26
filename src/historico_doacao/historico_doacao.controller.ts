import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoricoDoacaoService } from './historico_doacao.service';
import { CreateHistoricoDoacaoDto } from './dto/create-historico_doacao.dto';
import { UpdateHistoricoDoacaoDto } from './dto/update-historico_doacao.dto';

@Controller('historico-doacao')
export class HistoricoDoacaoController {
  constructor(
    private readonly historicoDoacaoService: HistoricoDoacaoService,
  ) {}

  @Post()
  create(@Body() createHistoricoDoacaoDto: CreateHistoricoDoacaoDto) {
    return this.historicoDoacaoService.create(createHistoricoDoacaoDto);
  }

  @Get()
  findAll() {
    return this.historicoDoacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicoDoacaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistoricoDoacaoDto: UpdateHistoricoDoacaoDto,
  ) {
    return this.historicoDoacaoService.update(+id, updateHistoricoDoacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historicoDoacaoService.remove(+id);
  }
}
