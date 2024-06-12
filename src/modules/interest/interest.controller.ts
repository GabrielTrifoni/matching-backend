import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import {
  MyResponse,
  Paginated,
  Pagination,
  PaginationParams,
} from 'src/decorators/pagination.decorator';
import { Interest } from '@entities/interest.entity';
import { AuthUser } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { IAuthUser } from '@modules/auth/auth.service';
import { UpdateInterestStatusDto } from './dto/update-interest-status.dto';

@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async create(
    @Body() createInterestDto: CreateInterestDto,
    @AuthUser() user: IAuthUser,
  ) {
    await this.interestService.create(createInterestDto, user);

    return {
      status: HttpStatus.OK,
      message: 'O interesse foi criado com sucesso.',
    };
  }

  @Get()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async findAll(
    @PaginationParams() params: Pagination,
  ): Promise<MyResponse<Paginated<Interest>>> {
    const interests = await this.interestService.findAll(params);

    return {
      status: HttpStatus.OK,
      message: 'Interesses obtidos com sucesso.',
      payload: interests,
    };
  }

  @Get(':id')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async findOne(@Param('id') id: string) {
    const interest = await this.interestService.findOne(+id);

    console.log(interest);

    return {
      status: HttpStatus.OK,
      message: 'Interesse obtido com sucesso.',
      payload: interest,
    };
  }

  @Patch(':id')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInterestDto,
  ): Promise<MyResponse<void>> {
    await this.interestService.update(+id, dto);

    return {
      status: HttpStatus.OK,
      message: 'Interesse atualizado com sucesso.',
    };
  }

  @Patch(':id/updateStatus')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateInterestStatusDto,
  ): Promise<MyResponse<void>> {
    await this.interestService.updateStatus(+id, dto);

    return {
      status: HttpStatus.OK,
      message: 'Interesse atualizado com sucesso.',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestService.remove(+id);
  }
}
