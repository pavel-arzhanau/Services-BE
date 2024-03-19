import { Controller, Get } from '@nestjs/common';
import { IRegion } from './dto';

@Controller('region')
export class RegionController {
  @Get()
  getRegions(): Array<IRegion> {
    return [
      { id: 1, name: 'Minsk' },
      { id: 2, name: 'Minsk Region' },
      { id: 3, name: 'Vitebsk Region' },
      { id: 4, name: 'Mogilev Region' },
      { id: 5, name: 'Grodno Region' },
      { id: 5, name: 'Brest Region' },
      { id: 5, name: 'Gomel Region' },
    ];
  }
}
