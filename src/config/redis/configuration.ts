import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const token = 'redis';

export default registerAs(token, () => ({
  redis_host: configService.get<string>('REDIS_HOST'),
  redis_port: configService.get<number>('REDIS_PORT'),
}));
