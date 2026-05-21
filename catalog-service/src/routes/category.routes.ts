import { Router } from 'express';
import * as categoryController from '../controllers/category.controller.js';

const router = Router();

router.get('/', categoryController.getCategories);
router.get('/:categoryKey/tags', categoryController.getCategoryTags);
router.post('/', categoryController.addCategory);
router.delete('/:id', categoryController.deleteCategory);
router.put('/:id', categoryController.updateCategory);

export default router;
