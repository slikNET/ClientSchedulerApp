import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { TokenType } from '../../../common/enum/token-type.enum';
import { RedisService } from '../../redis/redis.service';
import { UserDetailsResponseDto } from '../../user/dto/response';
import { TokenService } from '../services/token.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private tokenService: TokenService,
    private redisService: RedisService,
  ) {
    super();
  }

  async validate(token: string): Promise<UserDetailsResponseDto> {
    const payload = await this.tokenService.verifyToken(
      token,
      TokenType.Refresh,
    );
    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    //  If user exist in Redis (if logged)
    const userExist = await this.redisService.exists(payload.id);
    if (!userExist) {
      throw new HttpException('User not logged', HttpStatus.UNAUTHORIZED);
    }

    const data = await this.redisService.get(payload.id);

    const { user } = JSON.parse(data);

    return user;
  }
}
