import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestDto } from './create-interest.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { InterestStatus } from 'src/enums/interest-status.enum';

export class UpdateInterestStatusDto extends PartialType(CreateInterestDto) {
  @IsNotEmpty({ message: 'O status não pode ser vazio' })
  @IsEnum(InterestStatus)
  status: InterestStatus;
}
