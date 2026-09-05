import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateDto } from '../dto/CreateDto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto) {
    const passwordHash: string = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        passwordHash,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
