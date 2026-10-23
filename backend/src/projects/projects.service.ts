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

  // Find and return all a projects the user.
  async findAllByUser(ownerId: string) {
    return await this.prisma.project.findMany({ where: { ownerId } });
  }

  // Finding a specific project with a check user and also checking on whether the project has been done.
  async findOne(id: string, ownerId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  // Update a project (with a check user)
  async update(id: string, ownerId: string, dto: UpdateProjectDto) {
    await this.findOne(id, ownerId);

    return await this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  // Delete a project (with a check user)
  async delete(id: string, ownerId: string) {
    await this.findOne(id, ownerId);

    return await this.prisma.project.delete({
      where: { id },
    });
  }
}
