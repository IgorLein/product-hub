import { Router } from 'express';
import { getAlsoViewedProducts } from '../controllers/alsoViewed.controller';

const router = Router();

router.get('/:productId', getAlsoViewedProducts);

export default router;
