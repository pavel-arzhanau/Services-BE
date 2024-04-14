import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ad } from './ads.model';
import { AdsService } from './ads.service';

@Module({
  controllers: [AdsController],
  imports: [SequelizeModule.forFeature([Ad])],
  providers: [AdsService],
})
export class AdsModule {}
