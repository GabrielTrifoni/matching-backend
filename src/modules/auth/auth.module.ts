import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserSubject } from '@entities/user-subject.entity';
import { Subject } from '@entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSubject, Subject]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '2592000s', // 30 days
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
