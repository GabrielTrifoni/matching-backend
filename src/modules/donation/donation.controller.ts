import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { DonationService } from './Donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { MyResponse } from 'src/decorators/pagination.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() dto: CreateDonationDto): Promise<MyResponse<void>> {
    await this.donationService.create(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Doação habilitada com sucesso.',
    };
  }
}
