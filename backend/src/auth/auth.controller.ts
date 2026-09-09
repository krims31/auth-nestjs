import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/currentUser.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateDto } from '../dto/CreateDto.dto';
import { LoginDto } from '../dto/LoginDto.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { RolesGuard } from './RolesGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Получать id токена
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: Express.User) {
    return user;
  }

  // Только для админов
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  getAdmin(@CurrentUser() user: Express.User) {
    return user;
  }

  // Регистрация пользователя
  @Post('register')
  async register(@Body() dto: CreateDto) {
    return await this.authService.register(dto);
  }

  // Логин пользователя
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
}
