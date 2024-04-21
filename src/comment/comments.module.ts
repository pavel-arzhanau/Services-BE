import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([Comment]), JwtModule.register({})],
  providers: [CommentsService],
})
export class CommentsModule {}
