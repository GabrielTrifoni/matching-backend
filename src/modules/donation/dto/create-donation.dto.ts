import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDonationDto {
  @IsNumber()
  expected: number;

  @IsNotEmpty()
  @IsInt()
  projectId: number;
}
