/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
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
  ) {
    this.logger = new Logger(UsersService.name);
  }

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }

  /**
   * The method to get all the users from the database
   * @param getUsersParamDto
   * @param limit
   * @param page
   * @returns
   */
  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    this.logger.log(this.profileConfiguration);
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'jhon@doe.com',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@doe.com',
      },
    ];
  }

  /**
   * The method to get one user from the database by ID
   * @param id
   * @returns
   */
  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
