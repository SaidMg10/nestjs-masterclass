import { Controller, Get, Logger, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(PostsController.name);
  }

  /*
   * GET localhost:300/posts/:userId
   */
  @Get('/:userId?')
  getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
