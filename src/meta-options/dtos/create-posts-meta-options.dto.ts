import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @ApiProperty({
    description: 'metaValue as a JSON string',
    example: '{"key": "value"}',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
