import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TokenType } from '../../../common/enum/token-type.enum';
import { UserEntity } from '../../../database/entities/user.entity';
import { RedisService } from '../../redis/redis.service';
import { UserCreateRequestDto } from '../../user/dto/request';
import { UserDetailsResponseDto } from '../../user/dto/response';
import { UserRepository } from '../../user/user.repository';
import { UserResponseMapper } from '../../user/user.response.mapper';
import { UserService } from '../../user/user.service';
import { LoginResponseDto } from '../dto/response/login.responce.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: UserRepository,
    public readonly userService: UserService,
    public readonly tokenService: TokenService,
    public readonly redisService: RedisService,
  ) {}

  public async signUp(dto: UserCreateRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.create(dto);

    const tokens = this.tokenService.generateAuthToken({
      id: user.id,
    });

    const authRes = {
      tokens,
      user: UserResponseMapper.toDetailsDto(user),
    };

    //  Get expiration date from refresh token
    const expDate = this.tokenService.getExpDate(
      tokens.refresh,
      TokenType.Refresh,
    );
    //  Set Data into Redis
    //  Set EXAT to delete tokens automatically
    await this.redisService.set(user.id, JSON.stringify(authRes), {
      EXAT: expDate,
    });

    return authRes;
  }

  public async signIn(user: UserDetailsResponseDto): Promise<LoginResponseDto> {
    const tokens = this.tokenService.generateAuthToken({
      id: user.id,
    });

    const authRes: LoginResponseDto = {
      tokens,
      user,
    };

    //  Get expiration date from refresh token
    const expDate = this.tokenService.getExpDate(
      tokens.refresh,
      TokenType.Refresh,
    );

    //  Set Data into Redis
    //  Set EXAT to delete tokens automatically
    await this.redisService.set(user.id, JSON.stringify(authRes), {
      EXAT: expDate,
    });

    return authRes;
  }

  public async logout(userID: string): Promise<void> {
    await this.redisService.delete(userID);
  }

  public async refresh(
    user: UserDetailsResponseDto,
  ): Promise<LoginResponseDto> {
    //  Update Tokens
    const tokens = this.tokenService.generateAuthToken({
      id: user.id,
    });

    const authRes = {
      tokens,
      user,
    };

    //  Get expiration date from refresh token
    const expDate = this.tokenService.getExpDate(
      tokens.refresh,
      TokenType.Refresh,
    );

    //  Update Data in Redis
    //  Set EXAT to delete tokens automatically
    await this.redisService.set(user.id, JSON.stringify(authRes), {
      EXAT: expDate,
    });

    return authRes;
  }
}
