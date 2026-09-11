import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CreateProjectDto } from '../dto/CreateProject.dto';
import { UpdateProjectDto } from '../dto/UpdateProjectDto.dto';
import { CurrentUser } from './../common/decorators/currentUser.decorator';
import { ProjectsService } from './projects.service';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  //
  @Post()
  async create(
    @Body() dto: CreateProjectDto,
    @CurrentUser() user: Express.User,
  ) {
    return await this.projectsService.create(dto, user.id);
  }

  // Получение всех проектов пользователя
  @Get()
  async findAll(@CurrentUser() user: Express.User) {
    return await this.projectsService.findAllByUser(user.id);
  }

  // Получить один проект пользователя
  @Get(':id')
  async findOneProject(
    @Param('id') id: string,
    @CurrentUser() user: Express.User,
  ) {
    return await this.projectsService.findOne(id, user.id);
  }

  // Обновить проект пользователя
  @Patch(':id')
  async updateProject(
    @Param('id')
    id: string,
    @CurrentUser() user: Express.User,
    @Body()
    dto: UpdateProjectDto,
  ) {
    return await this.projectsService.update(id, user.id, dto);
  }

  // Удаление конкретного проекта пользователя
  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
    @CurrentUser() user: Express.User,
  ) {
    return await this.projectsService.delete(id, user.id);
  }
}
