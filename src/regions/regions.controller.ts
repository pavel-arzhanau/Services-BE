import { Controller, Get } from '@nestjs/common';
import { IRegion } from './dto';
import { RegionService } from './regions.service';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  getRegions(): Promise<IRegion[]> {
    return this.regionService.getRegions();
  }
}
