import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [PaginationModule],
})
export class CommonModule {}
