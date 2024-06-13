import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class ProjectWithSubjectsDto {
  @IsInt({
    message: 'O campo projeto deve ser um número inteiro',
  })
  project: number;

  @IsNotEmpty({ message: 'Os assuntos não podem ser vazios' })
  @IsArray({ message: 'Os assuntos devem estar no formato de lista' })
  subjects: number[];
}
