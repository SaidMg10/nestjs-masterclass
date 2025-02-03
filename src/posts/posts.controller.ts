import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  // Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-posts.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

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
  @Get()
  getAllPosts(@Query() postQuery: GetPostsDto) {
    return this.postsService.findAll(postQuery);
  }
  // @Get()
  // getOnePost(@Param('userId') userId: string) {
  // return this.postsService.findOne(userId);
  // }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  createPosts(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is updated successfully',
  })
  @Patch()
  updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete()
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
