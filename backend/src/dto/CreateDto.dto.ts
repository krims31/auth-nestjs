import { IsNumber } from 'class-validator';

export class CreateDto {
  @IsNumber()
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date;
}
