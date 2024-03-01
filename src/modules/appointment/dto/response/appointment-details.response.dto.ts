import { ClientDetailsResponseDto } from '../../../client/dto/response/client-details.response.dto';
import { ServiceDetailsResponseDto } from '../../../service/dto/response/service-details.response.dto';

export class AppointmentDetailsResponseDto {
  id: string;
  date: Date;
  duration: string;
  // duration: {
  //   hours: number;
  //   minutes?: number;
  // };
  price: number;
  service: ServiceDetailsResponseDto;
  client: ClientDetailsResponseDto;
  createdAt: Date;
}
