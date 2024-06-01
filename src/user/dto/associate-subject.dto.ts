import { IsEmail, IsNotEmpty } from 'class-validator';

export class AssociateWithSubjectDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  subjectIds: number[];
}
