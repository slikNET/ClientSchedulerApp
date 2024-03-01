import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`environments/${process.env.NODE_ENV}.env`],
      load: [configuration],
    }),
  ],
  providers: [RedisConfigService],
  exports: [RedisConfigService],
})
export class RedisConfigModule {}
