import { PickType } from '@nestjs/swagger';

import { ServiceBaseRequestDto } from './service-base.request.dto';

export class ServiceCreateRequestDto extends PickType(ServiceBaseRequestDto, [
  'title',
  'duration',
  'price',
  'color',
]) {}
