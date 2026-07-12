import { getRecommendedProducts } from "../services/recommendation.service";


export async function getRecommendations(req: any, res: any, next: any) {
  try {
    const userId = req.params.userId as string | undefined;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId in path parameter' });
    }

    const recommendedProducts = await getRecommendedProducts(userId);
    res.json(recommendedProducts);
  } catch (error) {
    next(error);  // ← Передаёт ошибку в errorHandler middleware
  }
};
