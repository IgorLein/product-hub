import { Category } from './category.model.js';
import { Product } from './product.model.js';
import { ProductTag } from './productTag.model.js';
import { Tag } from './tag.model.js';

let modelsInitialized = false;

export function initModels(): void {
  if (modelsInitialized) {
    return;
  }

  Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products',
  });

  Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category',
  });

  Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'productId',
    otherKey: 'tagId',
    as: 'tags',
  });

  Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tagId',
    otherKey: 'productId',
    as: 'products',
  });

  ProductTag.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
  });

  ProductTag.belongsTo(Tag, {
    foreignKey: 'tagId',
    as: 'tag',
  });

  modelsInitialized = true;
}

export { Category, Product, ProductTag, Tag };
