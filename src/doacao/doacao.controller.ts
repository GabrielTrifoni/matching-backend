import { Controller } from '@nestjs/common';
import { DoacaoService } from './doacao.service';

@Controller('doacao')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}
}
