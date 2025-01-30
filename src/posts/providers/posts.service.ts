import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {
    this.logger = new Logger(PostsService.name);
  }

  findAll(userId: string) {
    this.logger.debug(`userId: ${userId}`);
    const user = this.usersService.findOneById(userId);

    return [
      {
        user: user,
        title: 'Test title',
        content: 'Test content',
      },
      {
        user: user,
        title: 'Test title 2',
        content: 'Test content 2',
      },
    ];
  }
}
