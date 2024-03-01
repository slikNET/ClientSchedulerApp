import { Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

@Injectable()
export class RedisService {
  constructor(@InjectRedisClient() private redisClient: RedisClient) {}

  async set(key: string, value: string, options: object): Promise<void> {
    await this.redisClient.set(key, value, options);
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async exists(key: string): Promise<number> {
    return await this.redisClient.exists(key);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
