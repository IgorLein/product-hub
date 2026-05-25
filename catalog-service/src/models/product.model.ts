import {
  DataTypes,
  Model,
  Optional,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from 'sequelize';
import sequelize from '../config/db.js';
import { Tag } from './tag.model.js';

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  imageFileName: string;
  imageUrl: string;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare imageFileName: string;
  declare imageUrl: string;
  declare categoryId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare getTags: BelongsToManyGetAssociationsMixin<Tag>;

  declare setTags: BelongsToManySetAssociationsMixin<Tag, number>;

  declare addTags: BelongsToManyAddAssociationsMixin<Tag, number>;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imageFileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
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
    tableName: 'products',
    modelName: 'Product',
    timestamps: true,
    indexes: [
      { fields: ['categoryId'] },
      { fields: ['name'] },
    ],
  }
);
