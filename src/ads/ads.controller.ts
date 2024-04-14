import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAdDto, IAd } from './dto';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private readonly adService: AdsService) {}

  @Post()
  createUser(@Body() adDto: CreateAdDto): Promise<IAd> {
    return this.adService.createAd(adDto);
  }

  @Get(':categoryName/:subcategoryName')
  async getAllAdsByCategoryAndSubcategory(
    @Param('categoryName') categoryName: string,
    @Param('subcategoryName') subcategoryName: string,
  ) {
    const ads = await this.adService.getAllAdsByCategoryAndSubcategory(
      categoryName,
      subcategoryName,
    );

    return ads;
  }
}
