import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';

export interface ProductTagAttributes {
  id: number;
  productId: number;
  tagId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductTagCreationAttributes
  extends Optional<ProductTagAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class ProductTag
  extends Model<ProductTagAttributes, ProductTagCreationAttributes>
  implements ProductTagAttributes
{
  declare id: number;
  declare productId: number;
  declare tagId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'product_tags',
    modelName: 'ProductTag',
    timestamps: true,
    indexes: [
      { fields: ['productId'] },
      { fields: ['tagId'] },
      { unique: true, fields: ['productId', 'tagId'] },
    ],
  }
);
