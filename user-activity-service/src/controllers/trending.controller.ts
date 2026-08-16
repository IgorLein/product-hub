import { getTrendingProductsWithDetails } from '../services/trending.service';

export async function getTrendingProducts(req: any, res: any, next: any) {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const limit = parseInt(req.query.limit as string) || 10;

    const trendingProducts = await getTrendingProductsWithDetails(days, limit);
    res.json(trendingProducts);
  } catch (error) {
    next(error);  // ← Передаёт ошибку в errorHandler middleware
  }
};
