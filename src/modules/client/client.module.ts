import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientEntity } from '../../database/entities/client.entity';
import { UserModule } from '../user/user.module';
import { ClientController } from './client.controller';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), UserModule],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
  exports: [ClientRepository],
})
export class ClientModule {}
