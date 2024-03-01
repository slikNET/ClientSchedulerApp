import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configs: ConfigType<typeof configuration>,
  ) {}

  get app_port(): number {
    return this.configs.app_port;
  }
  get app_host(): string {
    return this.configs.app_host;
  }

  get db_host(): string {
    return this.configs.db_host;
  }
  get db_port(): number {
    return this.configs.db_port;
  }
  get db_user(): string {
    return this.configs.db_user;
  }
  get db_password(): string {
    return this.configs.db_password;
  }
  get db_database(): string {
    return this.configs.db_database;
  }

  get hash_rounds(): number {
    return this.configs.hash_rounds;
  }
}
