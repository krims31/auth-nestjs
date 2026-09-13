import { Module } from '@nestjs/common';
import { ProjectsService } from '../projects.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ProjectsService],
})
export class TasksModule {}
