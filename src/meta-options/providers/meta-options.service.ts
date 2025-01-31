import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/create-posts-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {
    this.logger = new Logger(MetaOptionsService.name);
  }

  async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    const newMetaOption = this.metaOptionsRepository.create(
      createPostMetaOptionsDto,
    );
    return await this.metaOptionsRepository.save(newMetaOption);
  }
}
