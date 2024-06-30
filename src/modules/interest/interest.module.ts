import { Module, forwardRef } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from 'src/entities/interest.entity';
import { ProjectModule } from '@modules/project/project.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    forwardRef(() => ProjectModule),
    TypeOrmModule.forFeature([Interest]),
    UserModule,
  ],
  controllers: [InterestController],
  providers: [InterestService],
  exports: [InterestService],
})
export class InterestModule {}
