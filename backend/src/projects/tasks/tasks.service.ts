import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../../dto/CreateTaskDto.dto';
import { UpdateTaskDto } from '../../dto/UpdateTaskDto.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectsService } from '../projects.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(dto: CreateTaskDto, projectId: string, ownerId: string) {
    await this.projectsService.findOne(projectId, ownerId);
    return await this.prisma.task.create({
      data: {
        title: dto.title,
        projectId,
      },
    });
  }

  async findAllByProject(projectId: string, ownerId: string) {
    await this.projectsService.findOne(projectId, ownerId);
    return await this.prisma.task.findMany({ where: { projectId } });
  }

  async findOne(id: string, projectId: string, ownerId: string) {
    await this.projectsService.findOne(projectId, ownerId);
    const task = await this.prisma.task.findFirst({
      where: { id, projectId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(
    id: string,
    projectId: string,
    ownerId: string,
    dto: UpdateTaskDto,
  ) {
    await this.findOne(id, projectId, ownerId);

    return await this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, projectId: string, ownerId: string) {
    await this.findOne(id, projectId, ownerId);

    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
