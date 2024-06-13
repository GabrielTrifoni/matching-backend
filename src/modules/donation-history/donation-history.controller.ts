import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { DonationHistoryService } from './donation-history.service';
import { CreateDonationHistoryDto } from './dto/create-donation-history.dto';
import { AuthUser } from 'src/decorators/user.decorator';
import { IAuthUser } from '@modules/auth/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { MyResponse } from 'src/decorators/pagination.decorator';

@Controller('donation-histories')
export class DonationHistoryController {
  constructor(
    private readonly donationHistoryService: DonationHistoryService,
  ) {}

  @Post()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async create(
    @Body() createDonationHistoryDto: CreateDonationHistoryDto,
    @AuthUser() user: IAuthUser,
  ): Promise<MyResponse<void>> {
    await this.donationHistoryService.create(createDonationHistoryDto, user);

    return {
      status: HttpStatus.CREATED,
      message: 'A doação foi realizada com sucesso.',
    };
  }

  @Get(':id')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async findAllByDonation(@Param('id') donationId: number) {
    const result =
      await this.donationHistoryService.findAllByDonations(donationId);

    return result;
  }

  @Get()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async findAllByUser(@AuthUser() user: IAuthUser) {
    const result = await this.donationHistoryService.findAllByUser(user);

    return result;
  }

  //TODO: verificar como fazer a rota deste endpoint
  @Get('project/:id')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async findAllByProjectId(@Param('id') projectId: number) {
    const result =
      await this.donationHistoryService.findAllByProjectId(projectId);

    return result;
  }
}
