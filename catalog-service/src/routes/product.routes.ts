import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import * as tagController from '../controllers/tag.controller.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.get('/:id/tags', tagController.getTagsByProductId);

router.post('/', upload.single('image'), productController.createProduct);

router.post('/with-tags', upload.single('image'), productController.createProductWithTags);

export default router;
