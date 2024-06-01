import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonationHistoryService } from './donation-history.service';
import { CreateDonationHistoryDto } from './dto/create-donation-history.dto';
import { UpdateDonationHistoryDto } from './dto/update-donation-history.dto';

@Controller('donation-histories')
export class DonationHistoryController {
  constructor(
    private readonly donationHistoryService: DonationHistoryService,
  ) {}

  @Post()
  create(@Body() createDonationHistoryDto: CreateDonationHistoryDto) {
    return this.donationHistoryService.create(createDonationHistoryDto);
  }

  @Get()
  findAll() {
    return this.donationHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationHistoryService.findOne(+id);
  }

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
