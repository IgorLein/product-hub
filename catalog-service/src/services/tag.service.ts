import { Tag } from '../models/tag.model.js';
import { TagDto, mapTagToDto } from '../mappers/tag.mapper.js';
import { Category, Product } from '../models/index.js';

export async function getTags(): Promise<TagDto[]> {
  const tags = await Tag.findAll({
    order: [["id", "ASC"]],
  });

  return tags.map(mapTagToDto);
};

export async function getTagsByProductId(productId: number): Promise<TagDto[]> {
  const tags = await Tag.findAll({
    include: [
      {
        model: Product,
        as: 'products',
        where: { id: productId },
        through: { attributes: [] },
      },
    ],
    order: [["id", "ASC"]],
  });

  return tags.map(mapTagToDto);
};

export async function getTagsByCategoryKey(categoryKey: string): Promise<TagDto[]> {
  const tags = await Tag.findAll({
    include: [
      {
        model: Product,
        as: 'products',
        required: true,
        include: [
          {
            model: Category,
            as: 'category',
            required: true,
            where: { key: categoryKey },
          },
        ],
        through: { attributes: [] },
      },
    ],
    order: [["id", "ASC"]],
  });

  return tags.map(mapTagToDto);
}
