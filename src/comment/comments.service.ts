import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto, IComment, UpdateCommentDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { User } from 'src/users/users.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async createComment(dto: CreateCommentDto): Promise<IComment> {
    const comment = await this.commentRepository.create(dto);
    return comment;
  }

  async getAllByAdId(adId: number): Promise<Comment[]> {
    const comments = await this.commentRepository.findAll({
      where: { adId },
      include: [
        {
          model: User,
        },
      ],
    });

    return comments;
  }

  async deleteCommentById(id: number) {
    const commentData = this.commentRepository.destroy({
      where: { id },
    });

    return commentData;
  }

  async updateComment(updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findByPk(updateCommentDto.id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await comment.update(updateCommentDto);
    return comment;
  }
}
