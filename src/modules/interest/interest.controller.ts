import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseFilters,
  UseGuards,
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
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { IAuthUser } from '@modules/auth/auth.service';

@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  @UseFilters(new HttpExceptionFilter())
  create(
    @Body() createInterestDto: CreateInterestDto,
    @AuthUser() user: IAuthUser,
  ) {
    this.interestService.create(createInterestDto, user);

    return {
      status: HttpStatus.OK,
      message: 'O interesse foi criado com sucesso.',
    };
  }

  @Get()
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
  findOne(@Param('id') id: string) {
    const interest = this.interestService.findOne(+id);

    return {
      status: HttpStatus.OK,
      message: 'Interesse obtido com sucesso.',
      payload: interest,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterestDto: UpdateInterestDto,
  ) {
    return this.interestService.update(+id, updateInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestService.remove(+id);
  }
}
