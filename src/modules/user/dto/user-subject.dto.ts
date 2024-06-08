import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserWithSubjectDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  subjects: number[];
}
