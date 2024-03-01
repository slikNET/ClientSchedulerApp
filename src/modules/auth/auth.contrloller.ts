import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../user/decorator/current-user.decorator';
import { UserCreateRequestDto, UserLoginRequestDto } from '../user/dto/request';
import { UserDetailsResponseDto } from '../user/dto/response';
import { LoginResponseDto } from './dto/response/login.responce.dto';
import { JwtGuard } from './guards/jwt-auth.guard';
import { LocalGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-auth.guard';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
// @ApiExtraModels()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(
    @Body() body: UserCreateRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.signUp(body);
  }

  //  TODO: ONLY email and password should be allowed!
  //  TODO: Fix Error if DTO is empty
  @UseGuards(LocalGuard)
  @ApiBody({ type: UserLoginRequestDto })
  @ApiResponse({ type: LoginResponseDto })
  @Post('sign-in')
  public async signIn(
    @CurrentUser() user: UserDetailsResponseDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.signIn(user);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  public async logout(
    @CurrentUser() user: UserDetailsResponseDto,
  ): Promise<void> {
    await this.authService.logout(user.id);
  }

  @UseGuards(RefreshJwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: LoginResponseDto })
  @Post('refresh')
  public async refresh(
    @CurrentUser() user: UserDetailsResponseDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.refresh(user);
  }
}
