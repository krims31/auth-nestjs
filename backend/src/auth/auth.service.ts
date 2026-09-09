import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateDto } from '../dto/CreateDto.dto';
import { LoginDto } from '../dto/LoginDto.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Регистрация пользователя
  async register(dto: CreateDto) {
    return await this.usersService.create(dto);
  }

  // Обновление токена
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<{ sub: string }>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isValid = await bcrypt.compare(
        refreshToken,
        user.refreshTokenHash || '',
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return {
        access_token: this.jwtService.sign({
          sub: user.id,
          email: user.email,
          role: user.role,
        }),
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token expired');
      } else {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }
  }

  // Логин пользователя
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    // Проверка пользователя что он существует или нет
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPassword = await bcrypt.compare(dto.password, user.passwordHash);

    // Проверка пароля что он существует или нет
    if (!isPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
      refresh_token: refreshToken,
    };
  }

  async logout(userId: string) {
    return await this.usersService.clearRefreshToken(userId);
  }
}
