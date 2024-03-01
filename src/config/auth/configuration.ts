import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const token = 'auth';

export default registerAs(token, () => ({
  accessTokenSecret: configService.get<string>('AUTH_ACCESS_TOKEN_SECRET'),
  refreshTokenSecret: configService.get<string>('AUTH_REFRESH_TOKEN_SECRET'),
  accessTokenExpiration: configService.get<string>(
    'AUTH_ACCESS_TOKEN_EXPIRATION',
  ),
  refreshTokenExpiration: configService.get<string>(
    'AUTH_REFRESH_TOKEN_EXPIRATION',
  ),
}));
