import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './CreateTaskDto.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
