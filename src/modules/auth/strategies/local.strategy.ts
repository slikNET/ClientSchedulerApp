import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserDetailsResponseDto } from '../../user/dto/response';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserDetailsResponseDto> {
    return await this.userService.validate({ email, password });
  }
}
