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
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../user/decorator/current-user.decorator';
import { UserDetailsResponseDto } from '../user/dto/response';
import { ServiceCreateRequestDto } from './dto/request/service-create.request.dto';
import { ServiceUpdateRequestDto } from './dto/request/service-update.request.dto';
import { ServiceDetailsResponseDto } from './dto/response/service-details.response.dto';
import { ServiceResponseMapper } from './service.response.mapper';
import { ServiceService } from './service.service';

@ApiTags('Services')
@ApiBearerAuth()
@ApiExtraModels()
@UseGuards(JwtGuard)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiOperation({ summary: 'Get all Services of an authorized User' })
  @Get('all')
  async getAll(
    @CurrentUser() user: UserDetailsResponseDto,
  ): Promise<ServiceDetailsResponseDto[]> {
    const services = await this.serviceService.getAll(user.id);

    return ServiceResponseMapper.toListDto(services);
  }

  @ApiOperation({ summary: 'Create a new Service for an authorized User' })
  @Post('create')
  async create(
    @CurrentUser() user: UserDetailsResponseDto,
    @Body() body: ServiceCreateRequestDto,
  ): Promise<ServiceDetailsResponseDto> {
    const service = await this.serviceService.create(user.id, body);

    return ServiceResponseMapper.toDetailsDto(service);
  }

  @ApiOperation({ summary: 'Update Service by ID' })
  @Put('update/:serviceID')
  async update(
    @Param('serviceID') serviceID: string,
    @Body() body: ServiceUpdateRequestDto,
  ): Promise<ServiceDetailsResponseDto> {
    const service = await this.serviceService.update(serviceID, body);
    return ServiceResponseMapper.toDetailsDto(service);
  }

  @ApiOperation({ summary: 'Delete Service by ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:serviceID')
  async delete(@Param('serviceID') serviceID: string): Promise<void> {
    await this.serviceService.delete(serviceID);
  }
}
