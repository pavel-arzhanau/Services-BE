import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { Subcategory } from './subcategories.model';
import { CategoryService } from './categories.service';

@Module({
  controllers: [CategoryController],
  imports: [SequelizeModule.forFeature([Category, Subcategory])],
  providers: [CategoryService],
})
export class CategoriesModule {}
