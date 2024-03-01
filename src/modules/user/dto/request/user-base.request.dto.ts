import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

import { UserRole } from '../../enum/user.role.enum';

export class UserBaseRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  username: string;

  @IsString()
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @IsNotEmpty({
    message: 'Email should not be empty',
  })
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Password should not be empty',
  })
  @Matches(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])\S*$/, {
    message:
      'Password must contain at least 8 characters, 1 uppercase letter and 1 digit.',
  })
  password: string;

  @ApiProperty({
    enum: UserRole,
    default: UserRole.GUEST,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsBoolean()
  @IsNotEmpty()
  activated: boolean;
}
