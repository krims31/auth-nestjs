import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '../../generated/prisma/client';
import { CreateDto } from '../dto/CreateDto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create a user in the DataBase.
  async create(dto: CreateDto) {
    const passwordHash: string = await bcrypt.hash(dto.password, 10);

    try {
      return await this.prisma.user.create({
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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  // Save a hash refresh-token in the data base.
  async updateRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    return await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash },
    });
  }

  // Clear a hash refresh-token.
  async clearRefreshToken(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: null },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        email: true,
      },
    });
  }

  // Find a user by id.
  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  // Find a user by email.
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
