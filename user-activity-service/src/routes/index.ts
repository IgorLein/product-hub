import { Router } from 'express';
import favoriteRoutes from './favorite.routes';
import recentlyViewedRoutes from './recentlyViewed.routes';

const router = Router();
router.use('/favorites', favoriteRoutes);
router.use('/recently-viewed', recentlyViewedRoutes);

export default router;
