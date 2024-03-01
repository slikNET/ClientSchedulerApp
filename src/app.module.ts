import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configs: AppConfigService) => ({
        type: 'postgres',
        host: configs.db_host,
        port: configs.db_port,
        username: configs.db_user,
        password: configs.db_password,
        database: configs.db_database,
        synchronize: true,
        entities: [path.join(__dirname, 'database', '**', '*.entity{.ts,.js}')],
      }),
      inject: [AppConfigService],
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    ClientModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
