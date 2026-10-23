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

  // Get all a projects the user.
  @Get()
  async findAll(@CurrentUser() user: Express.User) {
    return await this.projectsService.findAllByUser(user.id);
  }

  // Get one a project the user.
  @Get(':id')
  async findOneProject(
    @Param('id') id: string,
    @CurrentUser() user: Express.User,
  ) {
    return await this.projectsService.findOne(id, user.id);
  }

  // Update a project the user.
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

  // Delete a specific project the user.
  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
    @CurrentUser() user: Express.User,
  ) {
    return await this.projectsService.delete(id, user.id);
  }
}
