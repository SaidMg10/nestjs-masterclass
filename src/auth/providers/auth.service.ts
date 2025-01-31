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

  login(email: string, password: string, id: number) {
    const user = this.usersService.findOneById(id);
    return 'SAMPLE_TOKEN';
  }

  isAuth() {
    return true;
  }
}
