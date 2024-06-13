import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @Matches(new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/), {
    message: 'O cpf deve ser válido.',
  })
  cpf: string;

  @IsNotEmpty()
  @Matches(new RegExp(/^[1-9]{2}(?:[2-8]|9[0-9])[0-9]{3}[0-9]{4}/), {
    message: 'O número deve seguir o padrão DDD+Número, ex.: 95975259054',
  })
  phone: string;

  @IsNotEmpty()
  bio: string;
}
