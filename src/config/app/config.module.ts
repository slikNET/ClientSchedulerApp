import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`environments/${process.env.NODE_ENV}.env`],
      load: [configuration],
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
