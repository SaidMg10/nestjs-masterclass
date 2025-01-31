import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from '../tags.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {
    this.logger = new Logger(TagsService.name);
  }

  async create(createTagsDto: CreateTagDto) {
    const existingTag = await this.tagsRepository.findOne({
      where: {
        name: createTagsDto.name,
      },
    });
    if (existingTag) throw new BadRequestException(`Tag already exist`);
    const tag = this.tagsRepository.create(createTagsDto);
    await this.tagsRepository.save(tag);
    return tag;
  }

  async findMultipleTags(tags: number[]) {
    const results = await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });
    return results;
  }

  async delete(id: number) {
    await this.tagsRepository.delete(id);
    return { deleted: true, id };
  }

  async softRemove(id: number) {
    await this.tagsRepository.softDelete(id);
    return { deleted: true, id };
  }
}
