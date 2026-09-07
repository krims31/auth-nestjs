import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateDto } from '../dto/CreateDto.dto';
import { LoginDto } from '../dto/LoginDto.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { RolesGuard } from './RolesGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  getAdmin() {
    return { message: 'Welcome, admin!' };
  }

  @Post('register')
  async register(@Body() dto: CreateDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
