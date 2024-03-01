import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenType } from '../../../common/enum/token-type.enum';
import { AuthConfigService } from '../../../config/auth/config.service';
import { TokenResponseDto } from '../dto/response/token.responce.dto';

export interface JwtPayload {
  id: string;
}

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private authConfigService: AuthConfigService,
  ) {}

  public generateAuthToken(payload: JwtPayload): TokenResponseDto {
    const accessTokenExpires = this.authConfigService.accessTokenExpiration;
    const refreshTokenExpires = this.authConfigService.refreshTokenExpiration;

    return {
      access: this.generateToken(payload, accessTokenExpires, TokenType.Access),
      refresh: this.generateToken(
        payload,
        refreshTokenExpires,
        TokenType.Refresh,
      ),
    };
  }

  public getExpDate = (token: string, type: TokenType): number | null => {
    const tokenDecoded = (token: string): any | null => {
      // TODO: fix any
      try {
        return this.jwtService.verify(token, {
          secret: this.getSecret(type),
        });
      } catch (error) {
        throw new Error('Error verifying token');
      }
    };
    const payload = tokenDecoded(token);

    return payload.exp ?? null;
  };

  public async verifyToken(
    token: string,
    type?: TokenType,
  ): Promise<Partial<JwtPayload>> {
    const options = {
      ...(type ? { secret: this.getSecret(type) } : {}),
    };

    try {
      return await this.jwtService.verifyAsync(token, options);
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  private generateToken(
    payload: JwtPayload,
    expiresIn: string,
    type: TokenType,
  ) {
    const secret = this.getSecret(type);
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  private getSecret(type: TokenType) {
    switch (type) {
      case TokenType.Access:
        return this.authConfigService.accessTokenSecret;
      case TokenType.Refresh:
        return this.authConfigService.refreshTokenSecret;
    }
  }
}
