import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ClientEntity } from '../../database/entities/client.entity';
import { UserRepository } from '../user/user.repository';
import { ClientRepository } from './client.repository';
import { ClientCreateRequestDto } from './dto/request/client-create.request.dto';
import { ClientUpdateRequestDto } from './dto/request/client-update.request.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly userRepository: UserRepository,
  ) {}

  //  Get all Clients by UserID
  public async getAll(userID: string): Promise<ClientEntity[]> {
    return await this.clientRepository.findBy({
      user: { id: userID },
    });
  }

  //  Create New Client
  public async create(
    userID: string,
    dto: ClientCreateRequestDto,
  ): Promise<ClientEntity> {
    const іsAtLeastOnePhone = dto.phone || dto.telegram || dto.viber;

    if (!іsAtLeastOnePhone) {
      throw new BadRequestException(
        'At least one of the phone numbers should be filled.',
      );
    }

    //  TODO: Check if phone number exist
    // const existingClient = await this.clientRepository.findOne({
    //   where: { viber: dto.viber },
    //   // { telegram: dto.phone },
    //   // { viber: dto.phone },
    // });
    // console.log(dto.viber);
    // console.log(existingClient);
    // if (existingClient) {
    //   throw new BadRequestException(
    //     'Client with this phone number already exist',
    //   );
    // }

    const user = await this.userRepository.findOneBy({ id: userID });

    //  TODO: validate unique phone number
    const client = this.clientRepository.create({ ...dto, user });

    return await this.clientRepository.save(client);
  }

  //  Update Client
  public async update(
    clientID: string,
    dto: ClientUpdateRequestDto,
  ): Promise<ClientEntity> {
    const іsAtLeastOnePhone = dto.phone || dto.telegram || dto.viber;

    if (!іsAtLeastOnePhone) {
      throw new BadRequestException(
        'At least one of the phone numbers should be filled.',
      );
    }

    //  TODO: Set null to undefined dto
    const client = await this.findClientByIdOrException(clientID);
    this.clientRepository.merge(client, dto);
    return await this.clientRepository.save(client);
  }

  //  Delete Client
  public async delete(clientID: string): Promise<void> {
    const client = await this.findClientByIdOrException(clientID);
    await this.clientRepository.remove(client);
  }

  //  Check if Client exist
  private async findClientByIdOrException(id: string): Promise<ClientEntity> {
    const entity = await this.clientRepository.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('Client entity not found');
    }
    return entity;
  }

  // private async isPhoneUnique(phone: string): Promise<void> {
  //   const existingClient = await this.clientRepository.findOne({
  //     where: [{ phone: phone }, { telegram: phone }, { viber: phone }],
  //   });
  //
  //   if (existingClient) {
  //     throw new BadRequestException(
  //       'Client with this phone number already exist',
  //     );
  //   }
  // }
}
