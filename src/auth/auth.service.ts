import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserJwtPayload } from 'src/user/types/user-request';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginCredentials: LoginUserDto) {
    const user = await this.usersService.findOne(loginCredentials.username);
    if (!user) return null;
    const isPasswordValid = await this.comparePassword(
      loginCredentials.password,
      user.password,
    );
    if (!isPasswordValid) return null;
    return user;
  }
  async comparePassword(password: string, encryped: string) {
    return await bcrypt.compare(password, encryped);
  }

  async jwtSign(user: User) {
    const payload: UserJwtPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    return await this.usersService.create(user);
  }
}
