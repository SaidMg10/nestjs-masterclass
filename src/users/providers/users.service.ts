/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    this.logger = new Logger(UsersService.name);
  }

  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    const isAuth = this.authService.isAuth();
    this.logger.debug(isAuth);
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

  findOneById(id: string) {
    return {
      id: 3,
      name: 'Alice Doe',
      email: 'alice@doe.com',
    };
  }
}
