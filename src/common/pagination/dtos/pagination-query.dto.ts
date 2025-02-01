import { IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(100)
  //   @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  //   @Type(() => Number)
  page?: number = 1;
}
