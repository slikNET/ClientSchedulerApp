import { Module } from '@nestjs/common';
import { RedisModule } from '@webeleon/nestjs-redis';

import { RedisConfigModule } from '../../config/redis/config.module';
import { RedisConfigService } from '../../config/redis/config.service';
import { RedisService } from './redis.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [RedisConfigModule],
      useFactory: async (configs: RedisConfigService) => ({
        url: `redis://${configs.redis_host}:${configs.redis_port}`,
      }),
      inject: [RedisConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class AppRedisModule {}
