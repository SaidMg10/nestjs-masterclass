import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class GetUsersParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
