import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface RegionCreationAttributes {
  name: string;
}

@Table({ tableName: 'regions', timestamps: false })
export class Region extends Model<Region, RegionCreationAttributes> {
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
}
