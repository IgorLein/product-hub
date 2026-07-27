import { Tag } from '../models/tag.model.js';
import { Product } from '../models/product.model.js';
import { Category } from '../models/category.model.js';
import { CategoryDto, mapCategoryToDto } from './category.mapper.js';

export type TagDto = {
  id: number;
  key: string;
  name: string;
};

export type ProductDto = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: CategoryDto | null;
  tags: TagDto[];
};

function mapTagToDto(tag: Tag): TagDto {
  return {
    id: tag.id,
    key: tag.key,
    name: tag.name,
  };
}

export function mapProductToDto(product: Product): ProductDto {
  const category = product.get('category') as Category | undefined;
  const tags = product.get('tags') as Tag[] | undefined;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    category: category ? mapCategoryToDto(category) : null,
    tags: tags ? tags.map(mapTagToDto) : [],
  };
}
