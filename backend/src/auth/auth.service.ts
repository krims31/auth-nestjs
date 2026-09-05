import { Injectable } from '@nestjs/common';
import { CreateDto } from '../dto/CreateDto.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: CreateDto) {
    return await this.usersService.create(dto);
  }
}
