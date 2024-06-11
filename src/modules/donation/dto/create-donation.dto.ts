import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDonationDto {
  @IsNumber()
  expected: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  closure: Date;

  @IsNotEmpty()
  @IsInt()
  projectId: number;
}
