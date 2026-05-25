import sequelize from "../config/db.js";
import { mapProductToDto, ProductDto } from "../mappers/product.mapper.js";
import { Category } from "../models/category.model.js";
import { Product, ProductCreationAttributes } from "../models/product.model.js";
import { ProductTag } from "../models/productTag.model.js";
import { Tag } from "../models/tag.model.js";
import { buildPaginatedResponse, PaginatedResponse, PaginationParams } from "../utils/pagination.js";

type GetProductsQuery = {
  category?: string;
  tag?: string;
} & PaginationParams;

export type CreationProductData = ProductCreationAttributes & {
  tagIds?: number[];
};

export async function getProducts(query: GetProductsQuery): Promise<PaginatedResponse<ProductDto>> {
  const categoryWhere = query.category ? { key: query.category } : undefined;
  const tagWhere = query.tag ? { key: query.tag } : undefined;

  const { rows: products, count: totalItems } = await Product.findAndCountAll({
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
    limit: query.limit,
    offset: query.offset,
    distinct: true,
  });

  return buildPaginatedResponse(products.map(mapProductToDto), {
    page: query.page,
    limit: query.limit,
    totalItems,
  });
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

export async function createProduct(productData: CreationProductData): Promise<ProductDto> {
  return await sequelize.transaction(async (transaction) => {
    const { tagIds, ...productFields } = productData;

    const product = await Product.create(productFields, { transaction });

    if (tagIds && tagIds.length > 0) {
      await ProductTag.bulkCreate(
        tagIds.map(tagId => ({
          productId: product.id,
          tagId,
        })),
        { transaction }
      );
    }

    const createdProduct = await Product.findByPk(product.id, {
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
      transaction,
    });

    if (!createdProduct) {
      throw new Error('Created product not found');
    }

    return mapProductToDto(createdProduct);
  });
}
