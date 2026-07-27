import { Op } from "sequelize";
import sequelize from "../config/db.js";
import { mapProductToDto, ProductDto } from "../mappers/product.mapper.js";
import { Category } from "../models/category.model.js";
import { Product, ProductCreationAttributes } from "../models/product.model.js";
import { ProductTag } from "../models/productTag.model.js";
import { Tag } from "../models/tag.model.js";
import { buildPaginatedResponse, PaginatedResponse, PaginationParams } from "../utils/pagination.js";
import * as productFileService from "./productFile.service.js";
import { WhereOptions } from "sequelize/lib/model";

type GetProductsQuery = {
  ids?: number[];
  categories?: string[];
  tags?: string[];
  excludeIds?: number[];
} & PaginationParams;

export type CreationProductData = ProductCreationAttributes & {
  tagIds?: number[];
};

export type CreationProductDataWithTags = ProductCreationAttributes & {
  tagKeys?: string[];
};

export async function getProducts(query: GetProductsQuery): Promise<PaginatedResponse<ProductDto>> {
  const categoryWhere = query.categories?.length ? { key: { [Op.in]: query.categories } } : undefined;
  const tagWhere = query.tags?.length ? { key: { [Op.in]: query.tags } } : undefined;
  const productWhere: WhereOptions = {};
  const idConditions: Record<symbol, number[]> = {};

  if (query.ids?.length) {
    idConditions[Op.in] = query.ids;
  }

  if (query.excludeIds?.length) {
    idConditions[Op.notIn] = query.excludeIds;
  }

  if (Object.getOwnPropertySymbols(idConditions).length > 0) {
    productWhere.id = idConditions;
  }

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
    where: { ...productWhere },
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
};

export async function createProductWithTags(productData: CreationProductDataWithTags): Promise<ProductDto> {
  return await sequelize.transaction(async (transaction) => {
    const { tagKeys, ...productFields } = productData;

    const product = await Product.create(productFields, { transaction });

    if (tagKeys && tagKeys.length > 0) {
      const uniqueTagKeys = [...new Set(tagKeys)];

      const tags = await Tag.findAll({
        where: { key: uniqueTagKeys },
        transaction,
      });

      if (tags.length !== uniqueTagKeys.length) {
        throw new Error('Some tags were not found');
      }

      await product.setTags(tags, { transaction });
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
};

export async function deleteProduct(productId: number): Promise<void> {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  await sequelize.transaction(async (transaction) => {
    await ProductTag.destroy({ where: { productId }, transaction });
    await product.destroy({ transaction });
  });

  await productFileService.deleteProductImage(product.imageFileName);
};
