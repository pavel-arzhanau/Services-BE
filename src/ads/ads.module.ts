import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ad } from './ads.model';
import { AdsService } from './ads.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AdsController],
  imports: [SequelizeModule.forFeature([Ad]), JwtModule.register({})],
  providers: [AdsService],
})
export class AdsModule {}
