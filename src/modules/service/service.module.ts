import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceEntity } from '../../database/entities/service.entity';
import { UserModule } from '../user/user.module';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './service.repository';
import { ServiceService } from './service.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity]), UserModule],
  controllers: [ServiceController],
  providers: [ServiceRepository, ServiceService],
  exports: [ServiceRepository],
})
export class ServiceModule {}
