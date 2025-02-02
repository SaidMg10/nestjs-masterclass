/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { CreateUserManyProvider } from './create-user-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Constructor de la clase `UsersService`.
   * Inyecta las dependencias necesarias para el servicio de usuarios,
   * como el `Logger` para el registro de eventos y el `AuthService` para la gestión de autenticación.
   *
   * @param logger - Instancia de Logger para manejar los logs del servicio de usuarios.
   * @param authService - Instancia del servicio de autenticación, utilizado para las operaciones de login/registro.
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly logger: Logger,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    private readonly dataSource: DataSource,

    private readonly createUsersManyProvider: CreateUserManyProvider,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {
    this.logger = new Logger(UsersService.name);
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * The method to get all the users from the database
   * @param getUsersParamDto
   * @param limit
   * @param page
   * @returns
   */
  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occured because the API endpint was permantly moved',
      },
    );
  }

  /**
   * The method to get one user from the database by ID
   * @param id
   * @returns
   */
  async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!user) {
      throw new NotFoundException(`The user id: ${id} does not exist`);
    }
    return user;
  }

  async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.createUsersManyProvider.createMany(createManyUsersDto);
  }

  async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }
}
