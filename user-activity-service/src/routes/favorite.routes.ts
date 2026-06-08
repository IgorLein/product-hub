import { Router } from 'express';
import { addFavorite, getFavorites } from '../controllers/favorite.controller';

const router = Router();

router.post('/', addFavorite);
router.get('/', getFavorites);

export default router;
