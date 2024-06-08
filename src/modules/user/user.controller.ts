import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpStatus,
  UseFilters,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Usuário criado com sucesso',
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    this.userService.update(id, updateUserDto);

    return {
      status: HttpStatus.OK,
      message: 'Usuário atualizado com sucesso.',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.userService.delete(id);

    return {
      status: HttpStatus.OK,
      message: `Usuário ${id} removido com sucesso.`,
    };
  }
}
