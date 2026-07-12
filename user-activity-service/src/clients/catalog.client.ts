import { env } from "../config/env";
import { ProductDto } from "../types/product";

export async function fetchProductsByIds(productIds: number[]): Promise<ProductDto[]> {
  const url = `${env.catalogServiceUrl}/api/products?ids=${productIds.join(',')}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = (await response.json()) as ProductDto[];
  return data;
}
