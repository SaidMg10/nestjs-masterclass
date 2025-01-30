import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-posts.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch-post.dto';

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
  @Get('/:userId')
  getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  createPosts(@Body() createPostDto: CreatePostDto) {
    this.logger.debug({ createPostDto });
  }

  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is updated successfully',
  })
  @Patch()
  updatePost(@Body() patchPostsDto: PatchPostDto) {
    this.logger.debug({ patchPostsDto });
  }
}
