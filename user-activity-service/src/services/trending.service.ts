import { RecentlyViewed } from '../models/recentlyViewed.model';
import { ProductDto } from '../types/product';
import { fetchProductsByIds } from '../clients/catalog.client';

type TrendingProduct = {
  productId: number;
  uniqueUsers: number;
};

type TrendingProductWithDetails = ProductDto & {
  uniqueUsers: number;
};

export async function getTrendingProducts(
  days: number = 7,
  limit: number = 10,
): Promise<TrendingProduct[]> {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const trendingProducts = await RecentlyViewed.aggregate<{
    _id: number;
    uniqueUsers: number;
  }>([
    {
      $match: {
        viewedAt: { $gte: fromDate },
      },
    },
    {
      $group: {
        _id: '$productId',
        uniqueUsers: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        uniqueUsers: -1,
      },
    },
    {
      $limit: limit,
    },
  ]);

  return trendingProducts.map((item) => ({
    productId: item._id,
    uniqueUsers: item.uniqueUsers,
  })) ;
};

export async function getTrendingProductsWithDetails(
  days: number = 7,
  limit: number = 10,
): Promise<TrendingProductWithDetails[]> {
  const trendingProducts = await getTrendingProducts(days, limit);

  const productIds = trendingProducts.map(
    (item) => item.productId
  );

  if (productIds.length === 0) {
    return [];
  }

  const products = await fetchProductsByIds(productIds);

  const productsById = new Map(
    products.items.map((product) => [product.id, product])
  );

  return trendingProducts
    .map((item) => {
      const product = productsById.get(item.productId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        uniqueUsers: item.uniqueUsers,
      };
    })
    .filter(
      (item): item is TrendingProductWithDetails =>
        item !== null
    );
}
