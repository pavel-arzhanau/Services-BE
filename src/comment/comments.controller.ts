import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto, IComment, UpdateCommentDto } from './dto';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createAd(@Body() commentDto: CreateCommentDto): Promise<IComment> {
    return this.commentService.createComment(commentDto);
  }

  @Get(':id')
  async getAllByAdId(@Param('id') adId: string) {
    const comments = await this.commentService.getAllByAdId(+adId);

    return comments;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') adId: string) {
    const data = await this.commentService.deleteCommentById(+adId);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() commentDto: UpdateCommentDto): Promise<IComment> {
    const comment = await this.commentService.updateComment(commentDto);
    return comment;
  }
}
