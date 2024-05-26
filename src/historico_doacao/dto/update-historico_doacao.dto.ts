import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricoDoacaoDto } from './create-historico_doacao.dto';

export class UpdateHistoricoDoacaoDto extends PartialType(CreateHistoricoDoacaoDto) {}
