import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  id: string;
  @IsString()
  @IsOptional()
  ownerId: string;
}
