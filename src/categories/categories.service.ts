import { Injectable } from '@nestjs/common';
import { ICategory } from './dto';
import { Category } from './categories.model';
import { InjectModel } from '@nestjs/sequelize';
import { Subcategory } from './subcategories.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async getCategories(): Promise<ICategory[]> {
    const categoriesWithSubcategories = await this.categoryRepository.findAll({
      include: Subcategory,
    });

    return categoriesWithSubcategories.map((category) => ({
      id: category.id,
      name: category.name,
      subcategories: category.subcategories,
    }));
  }
}
