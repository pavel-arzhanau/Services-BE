import { Injectable } from '@nestjs/common';
import { IRegion } from './dto';
import { Region } from './regions.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepository: typeof Region) {}

  async getRegions(): Promise<IRegion[]> {
    const regions = await this.regionRepository.findAll();
    return regions.map(({ id, name }) => ({ id, name }));
  }
}
