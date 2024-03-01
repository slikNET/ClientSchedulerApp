import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { ServiceEntity } from '../../database/entities/service.entity';
import { UserRepository } from '../user/user.repository';
import { ServiceCreateRequestDto } from './dto/request/service-create.request.dto';
import { ServiceUpdateRequestDto } from './dto/request/service-update.request.dto';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  //  Get all Services by UserID
  public async getAll(userID: string): Promise<ServiceEntity[]> {
    return await this.serviceRepository.findBy({
      user: { id: userID },
    });
  }

  //  Create New Service
  public async create(
    userID: string,
    dto: ServiceCreateRequestDto,
  ): Promise<ServiceEntity> {
    const user = await this.userRepository.findOneBy({ id: userID });

    const service = this.serviceRepository.create({ ...dto, user });
    return await this.serviceRepository.save(service);
  }

  //  Update Service
  public async update(
    serviceID: string,
    dto: ServiceUpdateRequestDto,
  ): Promise<ServiceEntity> {
    const service = await this.findServiceByIdOrException(serviceID);
    this.serviceRepository.merge(service, dto);
    return await this.serviceRepository.save(service);
  }

  //  Delete Service
  public async delete(serviceID: string): Promise<void> {
    const entity = await this.findServiceByIdOrException(serviceID);
    await this.serviceRepository.remove(entity);
  }

  //  Check if Service exist
  private async findServiceByIdOrException(id: string): Promise<ServiceEntity> {
    const entity = await this.serviceRepository.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('Service entity not found');
    }
    return entity;
  }
}
