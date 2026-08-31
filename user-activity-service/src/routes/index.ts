import { Router } from 'express';
import favoriteRoutes from './favorite.routes';
import recentlyViewedRoutes from './recentlyViewed.routes';
import recommendationRoutes from './recommendation.routes';
import trendingRoutes from './trending.routes';
import alsoViewedRoutes from './alsoViewed.routes';
import userRoutes from './user.routes';

const router = Router();
router.use('/favorites', favoriteRoutes);
router.use('/recently-viewed', recentlyViewedRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/users', userRoutes);
router.use('/trending', trendingRoutes);
router.use('/also-viewed', alsoViewedRoutes);

export default router;
