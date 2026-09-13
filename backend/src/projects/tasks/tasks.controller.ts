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
import { CurrentUser } from '../../common/decorators/currentUser.decorator';
import { CreateTaskDto } from '../../dto/CreateTaskDto.dto';
import { UpdateTaskDto } from '../../dto/UpdateTaskDto.dto';
import { JwtAuthGuard } from './../../auth/jwt.auth.guard';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Создать задачу
  @Post()
  async create(
    @Body() dto: CreateTaskDto,
    @CurrentUser() user: Express.User,
    @Param('projectId') projectId: string,
  ) {
    return await this.tasksService.create(dto, projectId, user.id);
  }

  // Получить все задачи проекта
  @Get()
  async findAllTasks(
    @Param('projectId') projectId: string,
    @CurrentUser() user: Express.User,
  ) {
    return await this.tasksService.findAllByProject(projectId, user.id);
  }

  // Получить одну задачу проекта
  @Get(':id')
  async findOneTask(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
    @CurrentUser() user: Express.User,
  ) {
    return await this.tasksService.findOne(id, projectId, user.id);
  }

  // Обновить задачу
  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
    @CurrentUser() user: Express.User,
    @Body() dto: UpdateTaskDto,
  ) {
    return await this.tasksService.update(id, projectId, user.id, dto);
  }

  // Удалить задачу
  @Delete(':id')
  async delete(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @CurrentUser() user: Express.User,
  ) {
    return await this.tasksService.delete(id, projectId, user.id);
  }
}
