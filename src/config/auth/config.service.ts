import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class AuthConfigService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configs: ConfigType<typeof configuration>,
  ) {}

  get accessTokenSecret(): string {
    return this.configs.accessTokenSecret;
  }

  get refreshTokenSecret(): string {
    return this.configs.refreshTokenSecret;
  }

  get accessTokenExpiration(): string {
    return this.configs.accessTokenExpiration;
  }

  get refreshTokenExpiration(): string {
    return this.configs.refreshTokenExpiration;
  }
}
