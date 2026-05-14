import { CategoryDto, mapCategoryToDto } from "../mappers/category.mapper.js";
import { Category } from "../models/category.model.js";

export async function getCategories(): Promise<CategoryDto[]> {
  const categories = await Category.findAll({
    order: [["id", "ASC"]],
  });

  return categories.map(mapCategoryToDto);
};
