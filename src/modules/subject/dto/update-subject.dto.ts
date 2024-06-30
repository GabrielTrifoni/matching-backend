import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @IsNotEmpty({ message: 'Assunto não pode ser vazio' })
  subject?: string;
}
