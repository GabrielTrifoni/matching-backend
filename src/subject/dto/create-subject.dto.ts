import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({
    message: 'O campo área de conhecimento deve ser preenchido',
  })
  knowledge: string;

  @IsNotEmpty({
    message: 'O campo assunto deve ser preenchido',
  })
  subject: string;
}
