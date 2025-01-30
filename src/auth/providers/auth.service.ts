/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  login(email: string, password: string, id: string) {
    const user = this.usersService.findOneById('3');
    return 'SAMPLE_TOKEN';
  }

  isAuth() {
    return true;
  }
}
