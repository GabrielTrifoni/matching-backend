import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullname: string;

  @Matches(new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/))
  cpf: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsNotEmpty()
  bio: string;
}
