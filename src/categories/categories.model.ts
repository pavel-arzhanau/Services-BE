import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Subcategory } from './subcategories.model';

interface CategoryCreationAttributes {
  name: string;
}

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<Category, CategoryCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Subcategory)
  subcategories: Subcategory[];
}
