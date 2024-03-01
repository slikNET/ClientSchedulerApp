import { AppointmentEntity } from '../../database/entities/appointment.entity';
import { ClientsResponseMapper } from '../client/client.response.mapper';
import { ServiceResponseMapper } from '../service/service.response.mapper';
import { AppointmentDetailsResponseDto } from './dto/response/appointment-details.response.dto';

export class AppointmentResponseMapper {
  static toListDto(data: AppointmentEntity[]): AppointmentDetailsResponseDto[] {
    return data.map(this.toDetailsDto);
  }

  static toDetailsDto(data: AppointmentEntity): AppointmentDetailsResponseDto {
    return {
      id: data.id,
      date: data.date,
      duration: data.duration,
      // duration: {
      //   hours: data.duration?.hours ? data.duration?.hours : 0,
      //   minutes: data.duration?.minutes ? data.duration?.minutes : 0,
      // },
      price: data.price,
      service: data.service
        ? ServiceResponseMapper.toDetailsDto(data.service)
        : null,
      client: data.client
        ? ClientsResponseMapper.toDetailsDto(data.client)
        : null,
      createdAt: data.createdAt,
    };
  }
}
