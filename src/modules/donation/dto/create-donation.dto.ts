import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsNumber()
  expected: number;

  @IsNotEmpty()
  @IsInt()
  projectId: number;
}
