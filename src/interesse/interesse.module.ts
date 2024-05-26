import { Module } from '@nestjs/common';
import { InteresseService } from './interesse.service';
import { InteresseController } from './interesse.controller';

@Module({
  controllers: [InteresseController],
  providers: [InteresseService],
})
export class InteresseModule {}
