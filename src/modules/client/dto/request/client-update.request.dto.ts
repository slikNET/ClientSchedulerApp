import { PickType } from '@nestjs/swagger';

import { ClientBaseRequestDto } from './client-base.request.dto';

export class ClientUpdateRequestDto extends PickType(ClientBaseRequestDto, [
  'name',
  'instagram',
  'phone',
  'telegram',
  'viber',
]) {}
