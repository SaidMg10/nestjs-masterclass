import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-posts-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(
    private readonly logger: Logger,
    private readonly metaOptionsService: MetaOptionsService,
  ) {
    this.logger = new Logger(MetaOptionsController.name);
  }

  @Post()
  create(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }
}
