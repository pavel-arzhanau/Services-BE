import { Module } from '@nestjs/common';
import { RegionController } from './regions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './regions.model';

@Module({
  controllers: [RegionController],
  imports: [SequelizeModule.forFeature([Region])],
})
export class RegionsModule {}
