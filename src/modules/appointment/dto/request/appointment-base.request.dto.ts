import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class AppointmentBaseRequestDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsOptional()
  @IsMilitaryTime()
  duration?: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;

  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsString()
  client: string;
}
