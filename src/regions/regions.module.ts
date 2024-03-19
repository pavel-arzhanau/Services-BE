import { Module } from '@nestjs/common';
import { RegionController } from './regions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './regions.model';
import { RegionService } from './regions.service';

@Module({
  controllers: [RegionController],
  imports: [SequelizeModule.forFeature([Region])],
  providers: [RegionService],
})
export class RegionsModule {}
