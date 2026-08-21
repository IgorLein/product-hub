import { getAlsoViewedProductsWithDetails } from '../services/alsoViewed.service';

export async function getAlsoViewedProducts(req: any, res: any, next: any) {
  try {
    const productId = parseInt(req.params.productId);
    const limit = parseInt(req.query.limit as string) || 10;

    const alsoViewedProducts = await getAlsoViewedProductsWithDetails(productId, limit);
    res.json(alsoViewedProducts);
  } catch (error) {
    next(error);  // ← Передаёт ошибку в errorHandler middleware
  }
};
