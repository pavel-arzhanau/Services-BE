import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Ad } from 'src/ads/ads.model';
import { Comment } from 'src/comment/comments.model';

interface UserCreationAttributes {
  name: string;
  phone: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rating: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.BLOB,
    allowNull: true,
  })
  photo: Buffer;

  @HasMany(() => Ad)
  ads: Ad[];

  @HasMany(() => Comment)
  comments: Comment[];
}
