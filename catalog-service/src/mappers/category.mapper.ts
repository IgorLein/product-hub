import { Category } from "../models/category.model.js";

export type CategoryDto = {
  id: number;
  key: string;
  name: string;
};

export function mapCategoryToDto(category: Category): CategoryDto {
  return {
    id: category.id,
    key: category.key,
    name: category.name,
  };
};
