import { Controller, Get } from '@nestjs/common';

// an array of categories with properties id, name

const categories = [
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Sports' },
  { id: 3, name: 'Business' },
];

@Controller('categories')
export class CategoryController {
  @Get()
  //   @UseGuards(JwtAuthGuard)
  getAllCategories() {
    return {
      message: 'Categories fetched successfully',
      success: true,
      data: categories,
    };
  }
}
