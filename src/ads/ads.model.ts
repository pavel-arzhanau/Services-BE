import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Subcategory } from 'src/categories/subcategories.model';
import { User } from 'src/users/users.model';
import { Comment } from 'src/comment/comments.model';

interface AdsCreationAttributes {
  userId: number;
  subcategoryId: number;
  title: string;
  description?: string;
  price?: null | number;
}

@Table({ tableName: 'ads', timestamps: true })
export class Ad extends Model<Ad, AdsCreationAttributes> {
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
  title: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  price: number;

  @ForeignKey(() => Subcategory)
  @Column({ type: DataType.INTEGER })
  subcategoryId: number;

  @BelongsTo(() => Subcategory)
  subcategory: Subcategory;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];
}
