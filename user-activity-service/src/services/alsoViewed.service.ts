import { RecentlyViewed } from '../models/recentlyViewed.model';
import { ProductDto } from '../types/product';
import { fetchProductsByIds } from '../clients/catalog.client';

type AlsoViewedProduct = ProductDto & {
  uniqueUsers: number;
};

export async function getAlsoViewedProductsWithDetails(
  productId: number,
  limit: number = 10,
): Promise<AlsoViewedProduct[]> {
  const alsoViewedProducts = await RecentlyViewed.aggregate<{
    _id: number;
    uniqueUsers: number;
  }>([
    {
      $match: {
        productId,
      },
    },
    {
      $lookup: {
        from: RecentlyViewed.collection.name,
        localField: 'userId',
        foreignField: 'userId',
        as: 'userViews',
      },
    },
    {
      $unwind: '$userViews',
    },
    {
      $match: {
        'userViews.productId': { $ne: productId },
      },
    },
    {
      $group: {
        _id: '$userViews.productId',
        uniqueUsers: { $sum: 1 },
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

  const productIds = alsoViewedProducts.map((item) => item._id);

  if (productIds.length === 0) {
    return [];
  }

  const products = await fetchProductsByIds(productIds);
  const productsById = new Map(
    products.items.map((product) => [product.id, product]),
  );

  return alsoViewedProducts
    .map((item) => {
      const product = productsById.get(item._id);

      if (!product) {
        return null;
      }

      return {
        ...product,
        uniqueUsers: item.uniqueUsers,
      };
    })
    .filter((item): item is AlsoViewedProduct => item !== null);
}
