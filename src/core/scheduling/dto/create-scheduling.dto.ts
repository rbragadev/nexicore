import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';
import { Scheduling } from '../entities/scheduling.entity';

export class CreateSchedulingDto extends Scheduling {
  @IsInt()
  professionalId: number;

  @IsInt()
  userId: number;

  @IsString()
  patientName: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  status: string;
}
