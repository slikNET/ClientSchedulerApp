import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const token = 'app';

export default registerAs(token, () => ({
  app_port: configService.get<number>('APP_PORT'),
  app_host: configService.get<string>('APP_HOST'),

  db_host: configService.get<string>('POSTGRES_HOST'),
  db_port: configService.get<number>('POSTGRES_PORT'),
  db_user: configService.get<string>('POSTGRES_USER'),
  db_password: configService.get<string>('POSTGRES_PASSWORD'),
  db_database: configService.get<string>('POSTGRES_DB'),

  hash_rounds: configService.get<number>('HASH_ROUNDS'),
}));
