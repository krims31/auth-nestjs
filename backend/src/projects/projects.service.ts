import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/CreateProject.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto, ownerId: string) {
    return await this.prisma.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        ownerId,
      },
    });
  }
}
