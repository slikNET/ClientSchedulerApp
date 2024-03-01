import { UserEntity } from '../../database/entities/user.entity';
// import { AppointmentResponseMapper } from '../appointment/appointment.response.mapper';
// import { ClientsResponseMapper } from '../client/client.response.mapper';
// import { ServiceResponseMapper } from '../service/service.response.mapper';
import { UserDetailsResponseDto } from './dto/response';

export class UserResponseMapper {
  static toListDto(data: UserEntity[]): UserDetailsResponseDto[] {
    return data.map(this.toDetailsDto);
  }

  static toDetailsDto(data: UserEntity): UserDetailsResponseDto {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      // appointments: data.appointments
      //   ? AppointmentResponseMapper.toListDto(data.appointments)
      //   : null,
      // services: data.services
      //   ? ServiceResponseMapper.toListDto(data.services)
      //   : null,
      // clients: data.clients
      //   ? ClientsResponseMapper.toListDto(data.clients)
      //   : null,
      activated: data.activated,
      createdAt: data.createdAt,
    };
  }
}
