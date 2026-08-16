import { Router } from 'express';
import { getTrendingProducts } from '../controllers/trending.controller';

const router = Router();

router.get('/', getTrendingProducts);

export default router;
