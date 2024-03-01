import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { UserUpdateRequestDto } from './dto/request';
import { UserDetailsResponseDto } from './dto/response';
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //  TODO: покищо будь-якому залогіненому користувачу доступні всі користувачі по запиту
  @ApiOperation({ summary: 'Get all Users' })
  @Get('all')
  async getAll(): Promise<UserDetailsResponseDto[]> {
    const users = await this.userService.getAll();
    return UserResponseMapper.toListDto(users);
  }

  // @ApiOperation({ summary: 'Get a list of Appointments by userID' })
  // @UseGuards(JwtGuard)
  // @Get(':userID/appointments')
  // async getUserAppointment(
  //   @Param('userID') userID: string,
  // ): Promise<UserDetailsResponseDto> {
  //   const user = await this.userService.getUserAppointment(userID);
  //   return UserResponseMapper.toDetailsDto(user);
  // }

  // @ApiOperation({ summary: 'Get a list of Clients by userID' })
  // @UseGuards(JwtGuard)
  // @Get(':userID/clients')
  // async getUserClients(
  //   @Param('userID') userID: string,
  // ): Promise<UserDetailsResponseDto> {
  //   const userEntity = await this.userService.getUserClients(userID);
  //   return UserResponseMapper.toDetailsDto(userEntity);
  // }

  // @ApiOperation({ summary: 'Get a list of Services by userID' })
  // @UseGuards(JwtGuard)
  // @Get(':userID/services')
  // async getUserService(
  //   @Param('userID') userID: string,
  // ): Promise<UserDetailsResponseDto> {
  //   const user = await this.userService.getUserServices(userID);
  //   return UserResponseMapper.toDetailsDto(user);
  // }

  @ApiOperation({ summary: 'Update User by userID' })
  @Put('update')
  async updateUser(
    @CurrentUser() user: UserDetailsResponseDto,
    @Body() body: UserUpdateRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const result = await this.userService.updateUser(user.id, body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Delete User by userID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete')
  async delete(@CurrentUser() user: UserDetailsResponseDto): Promise<void> {
    await this.userService.delete(user.id);
  }
}
