import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';

export interface TagAttributes {
  id: number;
  key: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TagCreationAttributes
  extends Optional<TagAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Tag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  declare id: number;
  declare key: string;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'tags',
    modelName: 'Tag',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['key'] },
      { unique: true, fields: ['name'] },
    ],
  }
);
