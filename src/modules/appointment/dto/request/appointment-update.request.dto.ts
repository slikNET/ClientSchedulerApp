import { PickType } from '@nestjs/swagger';

import { AppointmentBaseRequestDto } from './appointment-base.request.dto';

export class AppointmentUpdateRequestDto extends PickType(
  AppointmentBaseRequestDto,
  ['date', 'duration', 'price', 'service', 'client'],
) {}
