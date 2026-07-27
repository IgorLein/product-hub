import { env } from "../config/env";
import { ProductDto } from "../types/product";
import { PaginatedResponse } from "../types/product";

export async function fetchProductsByIds(productIds: number[]): Promise<PaginatedResponse<ProductDto>> {
  const url = `${env.catalogServiceUrl}/api/products?ids=${productIds.join(',')}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = (await response.json()) as PaginatedResponse<ProductDto>;
  return data;
}

export async function fetchFilteredProducts(
  categories: string[],
  tags: string[],
  excludeIds: number[]
): Promise<PaginatedResponse<ProductDto>> {
  const url = new URL(`${env.catalogServiceUrl}/api/products`);
  if (categories.length > 0) {
    url.searchParams.append('categories', categories.join(','));
  }
  if (tags.length > 0) {
    url.searchParams.append('tags', tags.join(','));
  }
  if (excludeIds.length > 0) {
    url.searchParams.append('excludeIds', excludeIds.join(','));
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = (await response.json()) as PaginatedResponse<ProductDto>;
  return data;
}
