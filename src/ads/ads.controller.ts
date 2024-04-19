import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateAdDto, IAd } from './dto';
import { AdsService } from './ads.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('ads')
export class AdsController {
  constructor(private readonly adService: AdsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createAd(@Body() adDto: CreateAdDto): Promise<IAd> {
    return this.adService.createAd(adDto);
  }

  @Get(':categoryName/:subcategoryName')
  async getAllByCategoryAndSubcategory(
    @Param('categoryName') categoryName: string,
    @Param('subcategoryName') subcategoryName: string,
  ) {
    const ads = await this.adService.getAllAdsByCategoryAndSubcategory(
      categoryName,
      subcategoryName,
    );

    return ads;
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    const ad = await this.adService.getAdById(id);

    return ad;
  }
}
