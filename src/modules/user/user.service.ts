import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AppConfigService } from '../../config/app/config.service';
import { UserEntity } from '../../database/entities/user.entity';
import { RedisService } from '../redis/redis.service';
import {
  UserCreateRequestDto,
  UserLoginRequestDto,
  UserUpdateRequestDto,
} from './dto/request';
import { UserDetailsResponseDto } from './dto/response';
import { UserRepository } from './user.repository';
import { UserResponseMapper } from './user.response.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appConfigService: AppConfigService,
    private readonly redisService: RedisService,
  ) {}

  public async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async create(dto: UserCreateRequestDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (user) {
      throw new BadRequestException('User already exist');
    }

    const newUser = this.userRepository.create(dto);

    const salt = await bcrypt.genSalt(+this.appConfigService.hash_rounds);
    newUser.password = await bcrypt.hash(dto.password, salt);

    await this.userRepository.save(newUser);

    return newUser;
  }

  public async getUserAppointment(userID: string): Promise<UserEntity> {
    await this.findUserByIdOrException(userID);
    const user = this.userRepository.findOne({
      where: { id: userID },
      relations: { appointments: true },
    });
    return await user;
  }

  public async getUserClients(userID: string): Promise<UserEntity> {
    await this.findUserByIdOrException(userID);
    const user = this.userRepository.findOne({
      where: { id: userID },
      relations: { clients: true },
    });
    return await user;
  }

  public async getUserServices(userID: string): Promise<UserEntity> {
    await this.findUserByIdOrException(userID);
    const user = this.userRepository.findOne({
      where: { id: userID },
      relations: { services: true },
    });
    return await user;
  }

  //  TODO: validate unique email
  public async updateUser(
    userID: string,
    dto: UserUpdateRequestDto,
  ): Promise<UserEntity> {
    const entity = await this.findUserByIdOrException(userID);
    this.userRepository.merge(entity, dto);
    return await this.userRepository.save(entity);
  }
  //  TODO: create endpoint to update email
  //  TODO: create endpoint to update password

  public async delete(userID: string): Promise<void> {
    const entity = await this.findUserByIdOrException(userID);
    await this.redisService.delete(userID);
    await this.userRepository.remove(entity);
  }

  public async validate(
    dto: UserLoginRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const user = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (!user) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passMatch = await bcrypt.compare(dto.password, user.password);
    if (!passMatch) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return UserResponseMapper.toDetailsDto(user);
  }

  private async findUserByIdOrException(userID: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userID });
    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return user;
  }
}
