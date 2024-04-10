import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from './categories.model';

interface SubcategoryCreationAttributes {
  name: string;
  categoryId: number;
}

@Table({ tableName: 'subcategories', timestamps: false })
export class Subcategory extends Model<
  Subcategory,
  SubcategoryCreationAttributes
> {
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
  name: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
