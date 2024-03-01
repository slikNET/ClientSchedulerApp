import { PickType } from '@nestjs/swagger';

import { ClientBaseRequestDto } from './client-base.request.dto';

export class ClientCreateRequestDto extends PickType(ClientBaseRequestDto, [
  'name',
  'instagram',
  'phone',
  'telegram',
  'viber',
  // 'іsAtLeastOnePhone',
]) {}
