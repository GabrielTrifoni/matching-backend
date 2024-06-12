import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  cpf?: string;
  email?: string;
  password?: string;
  fullname?: string;
  phone?: string;
  bio?: string;
}
