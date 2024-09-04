import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';

@Module({
  providers: [],
  controllers: [CategoryController],
})
export class CategoryModule {}
