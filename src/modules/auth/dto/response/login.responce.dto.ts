import { UserDetailsResponseDto } from '../../../user/dto/response';
import { TokenResponseDto } from './token.responce.dto';

export class LoginResponseDto {
  tokens: TokenResponseDto;
  user: UserDetailsResponseDto;
}
