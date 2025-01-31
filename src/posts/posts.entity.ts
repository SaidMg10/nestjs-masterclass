import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { postType } from './enums/post-types.enum';
import { postStatus } from './enums/post-status.enum';
import { CreatePostMetaOptionsDto } from './dtos/create-posts-meta-options.dto';

@Entity(/*{name: posts}*/)
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status: postStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp', //'datetime' in mysql
    nullable: true,
  })
  publishOn?: Date;

  //TODO: Work on these in lectures on relationships
  tags?: string[];
  metaOptions?: CreatePostMetaOptionsDto[];
}
