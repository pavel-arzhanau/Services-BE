import { Controller, Get } from '@nestjs/common';
import { ICategory } from './dto';
import { CategoryService } from './categories.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<ICategory[]> {
    return this.categoryService.getCategories();
  }
}
