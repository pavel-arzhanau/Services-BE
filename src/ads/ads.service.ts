import { Injectable } from '@nestjs/common';
import { CreateAdDto, IAd } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Ad } from './ads.model';
import { Subcategory } from 'src/categories/subcategories.model';
import { Category } from 'src/categories/categories.model';
import { User } from 'src/users/users.model';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad) private adRepository: typeof Ad) {}

  async createAd(dto: CreateAdDto): Promise<IAd> {
    const ad = await this.adRepository.create(dto);
    return {
      id: ad.id,
      userId: ad.userId,
      subcategoryId: ad.subcategoryId,
      title: ad.title,
      description: ad.description,
      price: ad.price,
    };
  }

  async getAllAdsByCategoryAndSubcategory(
    categoryName: string,
    subcategoryName: string,
  ): Promise<Ad[]> {
    const ads = await this.adRepository.findAll({
      include: [
        {
          model: Subcategory,
          where: { name: subcategoryName },
          include: [
            {
              model: Category,
              where: { name: categoryName },
            },
          ],
        },
        {
          model: User,
        },
      ],
    });

    return ads;
  }

  async getAdById(id: number): Promise<Ad> {
    const ad = await this.adRepository.findOne({
      where: { id },
      include: [
        {
          model: Subcategory,
          include: [
            {
              model: Category,
            },
          ],
        },
        {
          model: User,
        },
      ],
    });

    return ad;
  }
}
