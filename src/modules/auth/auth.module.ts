import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthConfigModule } from '../../config/auth/config.module';
import { AuthConfigService } from '../../config/auth/config.service';
import { UserEntity } from '../../database/entities/user.entity';
import { AppRedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.contrloller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';

const JwtFactory = async (config: AuthConfigService) => ({
  secret: config.accessTokenSecret,
  signOptions: {
    expiresIn: config.accessTokenExpiration,
  },
});

const JwtRegistrationOptions = {
  imports: [AuthConfigModule],
  useFactory: JwtFactory,
  inject: [AuthConfigService],
};

@Module({
  imports: [
    AppRedisModule,
    AuthConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
    }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(JwtRegistrationOptions),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshJwtStrategy,
    LocalStrategy,
    TokenService,
  ],
  // exports: [PassportModule, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
