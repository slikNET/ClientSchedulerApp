import { ServiceEntity } from '../../database/entities/service.entity';
import { ServiceDetailsResponseDto } from './dto/response/service-details.response.dto';

export class ServiceResponseMapper {
  static toListDto(data: ServiceEntity[]): ServiceDetailsResponseDto[] {
    return data.map(this.toDetailsDto);
  }

  static toDetailsDto(data: ServiceEntity): ServiceDetailsResponseDto {
    return {
      id: data.id,
      title: data.title,
      duration: data.duration,
      price: data.price,
      color: data.color,
      createdAt: data.createdAt,
    };
  }
}
