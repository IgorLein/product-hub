import { CategoryDto, mapCategoryToDto } from "../mappers/category.mapper.js";
import { Category } from "../models/category.model.js";
import { PaginationParams, PaginatedResponse, buildPaginatedResponse } from "../utils/pagination.js";

export async function getCategories(query: PaginationParams): Promise<PaginatedResponse<CategoryDto>> {
  const { rows: categories, count: totalItems } = await Category.findAndCountAll({
    order: [["id", "ASC"]],
    limit: query.limit,
    offset: query.offset,
  });

  return buildPaginatedResponse(categories.map(mapCategoryToDto), {
    page: query.page,
    limit: query.limit,
    totalItems,
  });
};
