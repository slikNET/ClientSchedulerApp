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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../user/decorator/current-user.decorator';
import { UserDetailsResponseDto } from '../user/dto/response';
import { AppointmentResponseMapper } from './appointment.response.mapper';
import { AppointmentService } from './appointment.service';
import { AppointmentCreateRequestDto } from './dto/request/appointment-create.request.dto';
import { AppointmentUpdateRequestDto } from './dto/request/appointment-update.request.dto';
import { AppointmentDetailsResponseDto } from './dto/response/appointment-details.response.dto';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('all')
  async getAll(
    @CurrentUser() user: UserDetailsResponseDto,
  ): Promise<AppointmentDetailsResponseDto[]> {
    const appointments = await this.appointmentService.getAll(user.id);
    return AppointmentResponseMapper.toListDto(appointments);
  }

  @Post('create')
  async create(
    @CurrentUser() user: UserDetailsResponseDto,
    @Body() body: AppointmentCreateRequestDto,
  ): Promise<AppointmentDetailsResponseDto> {
    const appointment = await this.appointmentService.create(user.id, body);
    return AppointmentResponseMapper.toDetailsDto(appointment);
  }

  @Put('update/:appointmentID')
  async update(
    @Param('appointmentID') appointmentID: string,
    @Body() body: AppointmentUpdateRequestDto,
  ): Promise<AppointmentDetailsResponseDto> {
    const appointment = await this.appointmentService.update(
      appointmentID,
      body,
    );
    return AppointmentResponseMapper.toDetailsDto(appointment);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:appointmentID')
  async delete(@Param('appointmentID') appointmentID: string): Promise<void> {
    await this.appointmentService.delete(appointmentID);
  }
}
