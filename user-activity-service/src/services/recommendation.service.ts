import { fetchFilteredProducts, fetchProductsByIds } from '../clients/catalog.client';
import { PaginatedResponse, ProductDto } from '../types/product';
import { getFavorites } from './favorite.service';
import { getRecentlyViewed } from './recentlyViewed.service';

export async function getRecommendedProducts(userId: string): Promise<PaginatedResponse<ProductDto>> {
  const favorites = await getFavorites(userId);
  const recentlyViewed = await getRecentlyViewed(userId);
  
  const resultIds = [...new Set([
    ...(favorites?.favorites || []),
    ...(recentlyViewed?.map(item => item.productId) || []),
  ])];

  const { items: baseProducts } = await fetchProductsByIds(resultIds);

  const { categories, tags } = baseProducts.reduce((acc, product) => {
    if (product.category) {
      acc.categories.add(product.category.key);
    }
    product.tags.forEach(tag => acc.tags.add(tag.key));
    return acc;
  }, { categories: new Set<string>(), tags: new Set<string>() });

  const recommendedProducts = await fetchFilteredProducts(
    Array.from(categories),
    Array.from(tags),
    resultIds
  );

  return recommendedProducts;
}
