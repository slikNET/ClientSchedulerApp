import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class RedisConfigService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configs: ConfigType<typeof configuration>,
  ) {}

  get redis_host(): string {
    return this.configs.redis_host;
  }

  get redis_port(): number {
    return this.configs.redis_port;
  }
}
