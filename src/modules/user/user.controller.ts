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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { UserWithSubjectDto } from './dto/user-subject.dto';
import { MyResponse } from 'src/decorators/pagination.decorator';
import { User } from '@entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() dto: CreateUserDto): Promise<MyResponse<void>> {
    await this.userService.create(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async findOne(@Body('email') email: string): Promise<MyResponse<User>> {
    const user = await this.userService.findOneWithSubjects(email);

    return {
      status: HttpStatus.OK,
      message: 'Usuário recuperado com sucesso.',
      payload: user,
    };
  }

  @Post('/subjects')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.STUDENT)
  @UseFilters(new HttpExceptionFilter())
  async associate(@Body() dto: UserWithSubjectDto): Promise<MyResponse<void>> {
    await this.userService.associateWithSubject(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Os assuntos foram associados com sucesso.',
    };
  }

  @Delete('/subjects')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.STUDENT)
  @UseFilters(new HttpExceptionFilter())
  async dissociate(@Body() dto: UserWithSubjectDto): Promise<MyResponse<void>> {
    await this.userService.dissociateWithSubject(dto);

    return {
      status: HttpStatus.OK,
      message: 'Os assuntos foram dissociados com sucesso.',
    };
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
