import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { AppointmentEntity } from '../../database/entities/appointment.entity';
import { ClientEntity } from '../../database/entities/client.entity';
import { ServiceEntity } from '../../database/entities/service.entity';
import { ClientRepository } from '../client/client.repository';
import { ServiceRepository } from '../service/service.repository';
import { UserRepository } from '../user/user.repository';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentCreateRequestDto } from './dto/request/appointment-create.request.dto';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly clientRepository: ClientRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getAll(userID: string): Promise<AppointmentEntity[]> {
    return await this.appointmentRepository.find({
      where: { user: { id: userID } },
      //  TODO: чи потрібно тут вказувати relations, якщо в респонсів я отримую ці значення вказавши 'eager: true' в entity?
      // relations: {
      //   service: true,
      //   client: true,
      // },
    });
  }

  public async create(
    userID: string,
    dto: AppointmentCreateRequestDto,
  ): Promise<AppointmentEntity> {
    const user = await this.userRepository.findOneBy({ id: userID });

    const service = await this.findServiceByIdOrException(dto.service);
    const client = await this.findClientByIdOrException(dto.client);

    const duration = dto?.duration ? dto.duration : service.duration;
    const price = dto?.price ? dto.price : service.price;

    const appointment = this.appointmentRepository.create({
      ...dto,
      duration,
      price,
      user,
      service,
      client,
    });
    return await this.appointmentRepository.save(appointment);
  }

  public async update(
    appointmentID: string,
    dto: any,
  ): Promise<AppointmentEntity> {
    const appointment =
      await this.findAppointmentByIdOrException(appointmentID);

    const service = await this.findServiceByIdOrException(dto.service);
    const client = await this.findClientByIdOrException(dto.client);

    const duration = dto?.duration ? dto.duration : service.duration;
    const price = dto?.price ? dto.price : service.price;

    this.appointmentRepository.merge(appointment, {
      ...dto,
      duration,
      price,
      service,
      client,
    });

    return await this.appointmentRepository.save(appointment);
  }

  public async delete(appointmentID: string): Promise<void> {
    const appointment =
      await this.findAppointmentByIdOrException(appointmentID);

    await this.appointmentRepository.remove(appointment);
  }

  private async findAppointmentByIdOrException(
    appointmentID: string,
  ): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findOneBy({
      id: appointmentID,
    });
    if (!appointment) {
      throw new UnprocessableEntityException('Appointment entity not found');
    }
    return appointment;
  }

  private async findClientByIdOrException(
    clientID: string,
  ): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({ id: clientID });
    if (!client) {
      throw new UnprocessableEntityException('Client entity not found');
    }
    return client;
  }

  private async findServiceByIdOrException(
    serviceID: string,
  ): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOneBy({ id: serviceID });
    if (!service) {
      throw new UnprocessableEntityException('Service entity not found');
    }
    return service;
  }
}
