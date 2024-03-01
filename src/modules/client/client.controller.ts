import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../user/decorator/current-user.decorator';
import { UserDetailsResponseDto } from '../user/dto/response';
import { ClientsResponseMapper } from './client.response.mapper';
import { ClientService } from './client.service';
import { ClientCreateRequestDto } from './dto/request/client-create.request.dto';
import { ClientUpdateRequestDto } from './dto/request/client-update.request.dto';
import { ClientDetailsResponseDto } from './dto/response/client-details.response.dto';

@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Get all Clients of an authorized User' })
  @Get('all')
  async getAll(
    @CurrentUser() user: UserDetailsResponseDto,
  ): Promise<ClientDetailsResponseDto[]> {
    const clients = await this.clientService.getAll(user.id);

    return ClientsResponseMapper.toListDto(clients);
  }

  @ApiOperation({ summary: 'Create a new Client for an authorized User' })
  @Post('create')
  async create(
    @CurrentUser() user: UserDetailsResponseDto,
    @Body() body: ClientCreateRequestDto,
  ): Promise<ClientDetailsResponseDto> {
    const client = await this.clientService.create(user.id, body);

    return ClientsResponseMapper.toDetailsDto(client);
  }

  @ApiOperation({ summary: 'Update Client by ID' })
  @Put('update/:clientID')
  async update(
    @Param('clientID') clientID: string,
    @Body() body: ClientUpdateRequestDto,
  ): Promise<ClientDetailsResponseDto> {
    const client = await this.clientService.update(clientID, body);

    return ClientsResponseMapper.toDetailsDto(client);
  }

  @ApiOperation({ summary: 'Delete Client by ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:clientID')
  async delete(@Param('clientID') clientID: string): Promise<void> {
    await this.clientService.delete(clientID);
  }
}
