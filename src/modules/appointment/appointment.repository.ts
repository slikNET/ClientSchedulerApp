import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AppointmentEntity } from '../../database/entities/appointment.entity';

@Injectable()
export class AppointmentRepository extends Repository<AppointmentEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AppointmentEntity, dataSource.manager);
  }
}
