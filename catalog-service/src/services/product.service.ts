import { mapProductToDto, ProductDto } from "../mappers/product.mapper.js";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { Tag } from "../models/tag.model.js";

type GetProductsQuery = {
  category?: string;
  tag?: string;
};

export async function getProducts(query: GetProductsQuery): Promise<ProductDto[]> {
  const categoryWhere = query.category ? { key: query.category } : undefined;
  const tagWhere = query.tag ? { key: query.tag } : undefined;

  const products = await Product.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        where: categoryWhere,
        required: !!categoryWhere,
      },
      {
        model: Tag,
        as: 'tags',
        where: tagWhere,
        required: !!tagWhere,
        through: { attributes: [] },
      },
    ],
    order: [['id', 'ASC']],
  });

  return products.map(mapProductToDto);
}

export async function getProductById(id: number): Promise<ProductDto | null> {
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Category,
        as: 'category',
      },
      {
        model: Tag,
        as: 'tags',
        through: { attributes: [] },
      },
    ],
  });

  return product ? mapProductToDto(product) : null;
};
