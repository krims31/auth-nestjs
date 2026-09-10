import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../dto/CreateProject.dto';
import { UpdateProjectDto } from '../dto/UpdateProjectDto.dto';
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

  // Ищет и возвращает все проекты пользователя
  async findAllByUser(ownerId: string) {
    return await this.prisma.project.findMany({ where: { ownerId } });
  }

  // Находит конкретный проект с проверкой владельца и проверяет на наличие проекта
  async findOne(id: string, ownerId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  // Обновление проекта (с проверкой владельца)
  async update(id: string, ownerId: string, dto: UpdateProjectDto) {
    await this.findOne(id, ownerId);

    return await this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  // Удаление проекта (с проверкой владельца)
  async delete(id: string, ownerId: string) {
    await this.findOne(id, ownerId);

    return await this.prisma.project.delete({
      where: { id },
    });
  }
}
