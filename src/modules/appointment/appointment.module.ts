import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentEntity } from '../../database/entities/appointment.entity';
import { ClientModule } from '../client/client.module';
import { ServiceModule } from '../service/service.module';
import { UserModule } from '../user/user.module';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity]),
    ServiceModule,
    ClientModule,
    UserModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentRepository, AppointmentService],
  exports: [AppointmentRepository],
})
export class AppointmentModule {}
