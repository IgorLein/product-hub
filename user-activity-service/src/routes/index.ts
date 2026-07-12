import { Router } from 'express';
import favoriteRoutes from './favorite.routes';
import recentlyViewedRoutes from './recentlyViewed.routes';
import recommendationRoutes from './recommendation.routes';

const router = Router();
router.use('/favorites', favoriteRoutes);
router.use('/recently-viewed', recentlyViewedRoutes);
router.use('/recommendations', recommendationRoutes);

export default router;
