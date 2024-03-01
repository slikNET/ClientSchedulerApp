import { PickType } from '@nestjs/swagger';

import { UserBaseRequestDto } from './user-base.request.dto';

export class UserCreateRequestDto extends PickType(UserBaseRequestDto, [
  'username',
  'email',
  'password',
  'role',
]) {}
