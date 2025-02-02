/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/singin-dto';
import { User } from 'src/users/user.entity';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly signInProvider: SignInProvider,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async singIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  isAuth() {
    return true;
  }
}
