import { ClientEntity } from '../../database/entities/client.entity';
import { ClientDetailsResponseDto } from './dto/response/client-details.response.dto';

export class ClientsResponseMapper {
  static toListDto(data: ClientEntity[]): ClientDetailsResponseDto[] {
    return data.map(this.toDetailsDto);
  }

  static toDetailsDto(data: ClientEntity): ClientDetailsResponseDto {
    return {
      id: data.id,
      name: data.name,
      instagram: data.instagram,
      phone: data.phone,
      telegram: data.telegram,
      viber: data.viber,
      createdAt: data.createdAt,
    };
  }
}
