import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import * as tagController from '../controllers/tag.controller.js';

const router = Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.get('/:id/tags', tagController.getTagsByProductId);

export default router;
