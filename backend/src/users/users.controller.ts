import { Body, Controller, Post } from '@nestjs/common';
import { CreateDto } from '../dto/CreateDto.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() dto: CreateDto) {
    return await this.usersService.create(dto);
  }
}
