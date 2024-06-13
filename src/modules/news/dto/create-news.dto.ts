import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty({
    message: 'O título não pode ser vazio.',
  })
  title: string;

  @IsNotEmpty({
    message: 'A descrição não pode ser vazia.',
  })
  description: string;

  attachments?: string;
}
