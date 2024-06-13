import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestDto } from './create-interest.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateInterestDto extends PartialType(CreateInterestDto) {
  @IsNotEmpty({ message: 'A razão não pode ser vazia' })
  @MinLength(10, { message: 'A razão deve ser maior do que 10 caracteres' })
  reason: string;
}
