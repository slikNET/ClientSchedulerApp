import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ServiceEntity } from '../../database/entities/service.entity';

@Injectable()
export class ServiceRepository extends Repository<ServiceEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ServiceEntity, dataSource.manager);
  }
}
