import { Router } from 'express';
import { addRecentlyViewed, getRecentlyViewed } from '../controllers/recentlyViewed.controller';

const router = Router();

router.post('/', addRecentlyViewed);
router.get('/', getRecentlyViewed);

export default router;
