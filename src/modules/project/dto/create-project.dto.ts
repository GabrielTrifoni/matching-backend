import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'O título não pode ser vazio.' })
  title: string;

  @IsNotEmpty({ message: 'A motivação não pode ser vazia.' })
  motivation: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  description: string;

  @IsNotEmpty({ message: 'O projeto deve estar relacionado a um PAEG' })
  paeg: string;

  @IsOptional()
  attachments?: string;

  @IsNotEmpty({ message: 'A quantidade de vagas não pode ser vazia.' })
  @IsInt({ message: 'A quantidade de vagas deve ser um número inteiro' })
  slots: number;

  @IsNotEmpty({ message: 'A carga horária estimada não pode ser vazia' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'A carga horária estimada deve ser um número' },
  )
  workload: number;

  @IsNotEmpty({ message: 'A data de fim não pode ser vazia' })
  @IsDateString()
  // @IsDate({ message: 'Deve estar em um formato válido de data (YYYY-MM-DD)' })
  endDate: number;

  @IsNotEmpty({ message: 'É obrigatório inserir o orientador do projeto' })
  supervisor: string;

  @IsNotEmpty({ message: 'O projeto deve ter assuntos relacionados' })
  @IsArray({ message: 'Os assuntos devem ser uma lista' })
  @ArrayMinSize(1, {
    message: 'O projeto deve ter no mínimo 1 assunto relacionado',
  })
  subjects: number[];
}
