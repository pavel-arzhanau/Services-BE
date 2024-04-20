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

    const sortedCategories = categoriesWithSubcategories
      .map((category) => {
        const sortedSubcategory = category.subcategories.sort((a, b) =>
          a.name === 'other' ? 1 : b.name === 'other' ? -1 : 0,
        );

        return {
          id: category.id,
          name: category.name,
          subcategories: sortedSubcategory,
        };
      })
      .sort((a, b) => (a.name === 'other' ? 1 : b.name === 'other' ? -1 : 0));

    return sortedCategories;
  }
}
