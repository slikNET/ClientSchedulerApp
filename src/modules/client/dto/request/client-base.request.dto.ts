import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

// import { IsAtLeastOnePhone } from '../../decorator/unique-phone.decorator';

export class ClientBaseRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  instagram?: string;

  @IsOptional()
  @IsString()
  @Length(13, 13)
  @Transform(({ value }) => (value ? value.trim() : null))
  @Matches(/^(?:(?:\+38)?0\d{9}|0\d{9})$/, {
    message: 'Invalid phone number format.',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(13, 13)
  @Transform(({ value }) => (value ? value.trim() : null))
  @Matches(/^(?:(?:\+38)?0\d{9}|0\d{9})$/, {
    message: 'Invalid phone number format.',
  })
  telegram?: string;

  @IsOptional()
  @IsString()
  @Length(13, 13)
  @Transform(({ value }) => (value ? value.trim() : null))
  @Matches(/^(?:(?:\+38)?0\d{9}|0\d{9})$/, {
    message: 'Invalid phone number format.',
  })
  viber?: string;

  // @IsAtLeastOnePhone({
  //   message: 'At least one of the phone numbers should be filled.',
  // })
  // іsAtLeastOnePhone: string;
}
