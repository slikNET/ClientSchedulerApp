import { Transform } from 'class-transformer';
import {
  Contains,
  IsHexColor,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class ServiceBaseRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  title: string;

  // @IsString()
  @IsNotEmpty()
  @IsMilitaryTime()
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  @Contains('#')
  color: string;
}
