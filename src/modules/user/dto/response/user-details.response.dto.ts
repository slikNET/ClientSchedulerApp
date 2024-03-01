import { AppointmentDetailsResponseDto } from '../../../appointment/dto/response/appointment-details.response.dto';
import { ClientDetailsResponseDto } from '../../../client/dto/response/client-details.response.dto';
import { ServiceDetailsResponseDto } from '../../../service/dto/response/service-details.response.dto';

export class UserDetailsResponseDto {
  id: string;
  username: string;
  email: string;
  role: string;
  //  TODO: Тут закоментовано, тому що переробив сам запит. Вирішив не передавати стільки багато інформації про користувача. Замість цього створив директиву @CurrentUser() і всі ентіті пов'язані з ним можна взяти через цю директиву
  // appointments: AppointmentDetailsResponseDto[];
  // services: ServiceDetailsResponseDto[];
  // clients: ClientDetailsResponseDto[];
  activated: boolean;
  createdAt: Date;
}
