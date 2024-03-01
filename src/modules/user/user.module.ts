import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from '../../config/app/config.module';
import { UserEntity } from '../../database/entities/user.entity';
import { AppRedisModule } from '../redis/redis.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    AppRedisModule,
    AppConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
