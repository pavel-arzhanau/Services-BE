import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Ad } from 'src/ads/ads.model';

interface CommentCreationAttributes {
  userId: number;
  adId: number;
  content: string;
}

@Table({ tableName: 'comments', timestamps: true })
export class Comment extends Model<Comment, CommentCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
  })
  likes: number;

  @ForeignKey(() => Ad)
  @Column({ type: DataType.INTEGER })
  adId: number;

  @BelongsTo(() => Ad)
  ad: Ad;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
