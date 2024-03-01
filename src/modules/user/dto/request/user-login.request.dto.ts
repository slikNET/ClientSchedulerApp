import { PickType } from '@nestjs/swagger';

import { UserBaseRequestDto } from './user-base.request.dto';

export class UserLoginRequestDto extends PickType(UserBaseRequestDto, [
  'email',
  'password',
]) {}
