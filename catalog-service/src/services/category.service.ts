import { CategoryDto, mapCategoryToDto } from "../mappers/category.mapper.js";
import { Category, CategoryCreationAttributes } from "../models/category.model.js";
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

export async function addCategory(categoryData: CategoryCreationAttributes): Promise<CategoryDto> {
  const category = await Category.create(categoryData);
  return mapCategoryToDto(category);
}

export async function deleteCategory(categoryId: number): Promise<void> {
  await Category.destroy({ where: { id: categoryId } });
}

export async function updateCategory(categoryId: number, categoryData: Partial<CategoryCreationAttributes>): Promise<CategoryDto | null> {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    return null;
  }

  await category.update(categoryData);
  return mapCategoryToDto(category);
};
