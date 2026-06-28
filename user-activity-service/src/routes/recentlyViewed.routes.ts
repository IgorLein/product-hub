import { Router } from 'express';
import { addRecentlyViewed, getRecentlyViewed, removeRecentlyViewed } from '../controllers/recentlyViewed.controller';

const router = Router();

router.post('/', addRecentlyViewed);
router.post('/:userId', addRecentlyViewed);
router.get('/', getRecentlyViewed);
router.get('/:userId', getRecentlyViewed);
router.delete('/:userId', removeRecentlyViewed);

export default router;
