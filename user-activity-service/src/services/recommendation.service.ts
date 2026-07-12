import { fetchProductsByIds } from '../clients/catalog.client';
import { ProductDto } from '../types/product';
import { getFavorites } from './favorite.service';
import { getRecentlyViewed } from './recentlyViewed.service';

export async function getRecommendedProducts(userId: string): Promise<ProductDto[]> {
  const favorites = await getFavorites(userId);
  const recentlyViewed = await getRecentlyViewed(userId);
  
  const resultIds = [...new Set([
    ...(favorites?.favorites || []),
    ...(recentlyViewed?.map(item => item.productId) || []),
  ])];

  const recommendedProducts = await fetchProductsByIds(resultIds);

  return recommendedProducts;
};
