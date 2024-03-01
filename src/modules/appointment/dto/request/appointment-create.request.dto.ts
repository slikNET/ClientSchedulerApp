import { PickType } from '@nestjs/swagger';

import { AppointmentBaseRequestDto } from './appointment-base.request.dto';

export class AppointmentCreateRequestDto extends PickType(
  AppointmentBaseRequestDto,
  ['date', 'duration', 'price', 'service', 'client'],
) {}
