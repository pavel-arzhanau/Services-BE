import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RegionController } from './region.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, RegionController],
  providers: [AppService],
})
export class AppModule {}
