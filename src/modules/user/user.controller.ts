import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpStatus,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { MyResponse } from 'src/decorators/pagination.decorator';
import { User } from '@entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthUser } from 'src/decorators/user.decorator';
import { IAuthUser } from '@modules/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<MyResponse<void>> {
    await this.userService.create(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Usuário criado com sucesso',
    };
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async findAll() {
    const users = await this.userService.findAll();

    return {
      status: HttpStatus.OK,
      message: 'Usuários recuperados com sucesso.',
      payload: users,
    };
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async findOne(@Body('email') email: string): Promise<MyResponse<User>> {
    const user = await this.userService.findOneWithSubjects(email);

    return {
      status: HttpStatus.OK,
      message: 'Usuário recuperado com sucesso.',
      payload: user,
    };
  }

  @Get('/details')
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  async getUserDetails(@AuthUser() user: IAuthUser) {
    const userDetails = await this.userService.getUserDetails(user.email);

    return userDetails;
  }

  @Patch(':id')
  @Roles(UserRole.STUDENT, UserRole.SUPERVISOR)
  @UseGuards(AuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    this.userService.update(id, updateUserDto);

    return {
      status: HttpStatus.OK,
      message: 'Usuário atualizado com sucesso.',
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: number) {
    this.userService.delete(id);

    return {
      status: HttpStatus.OK,
      message: `Usuário ${id} removido com sucesso.`,
    };
  }
}
