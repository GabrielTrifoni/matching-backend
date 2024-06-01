import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    console.log(email, password);

    const user = await this.userService.findOne(email);

    console.log(user);

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('A senha está inválida.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
