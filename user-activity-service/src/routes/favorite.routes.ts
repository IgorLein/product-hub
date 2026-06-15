import { Router } from 'express';
import { addFavorite, getFavorites } from '../controllers/favorite.controller';

const router = Router();


// Support both query-based and path-based userId
router.post('/', addFavorite);
router.post('/:userId', addFavorite);

router.get('/', getFavorites);
router.get('/:userId', getFavorites);

export default router;
