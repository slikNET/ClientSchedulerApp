import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ClientEntity } from '../../database/entities/client.entity';

@Injectable()
export class ClientRepository extends Repository<ClientEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ClientEntity, dataSource.manager);
  }
}
