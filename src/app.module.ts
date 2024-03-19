import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RegionController } from './region.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'guansoo96',
      database: 'services',
      models: [],
      autoLoadModels: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, RegionController],
  providers: [AppService],
})
export class AppModule {}
