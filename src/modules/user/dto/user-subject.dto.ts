import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class UserWithSubjectDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty({ message: 'Os assuntos não podem ser vazios' })
  @IsArray({ message: 'Os assuntos devem estar no formato de lista' })
  subjects: number[];
}
