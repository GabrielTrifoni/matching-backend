import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DonationHistoryService } from './donation-history.service';
import { CreateDonationHistoryDto } from './dto/create-donation-history.dto';
import { UpdateDonationHistoryDto } from './dto/update-donation-history.dto';
import { AuthUser } from 'src/decorators/user.decorator';
import { IAuthUser } from '@modules/auth/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('donation-histories')
export class DonationHistoryController {
  constructor(
    private readonly donationHistoryService: DonationHistoryService,
  ) {}

  @Post()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  create(
    @Body() createDonationHistoryDto: CreateDonationHistoryDto,
    @AuthUser() user: IAuthUser,
  ) {
    return this.donationHistoryService.create(createDonationHistoryDto, user);
  }

  @Get(':id')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  findAllByDonation(@Param('id') donationId: number) {
    return this.donationHistoryService.findAllByDonations(donationId);
  }

  @Get(':id')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.donationHistoryService.findOne(+id);
  }

  //TODO: terminar de fazer parte de history donations e donation

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDonationHistoryDto: UpdateDonationHistoryDto,
  ) {
    return this.donationHistoryService.update(+id, updateDonationHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donationHistoryService.remove(+id);
  }
}
