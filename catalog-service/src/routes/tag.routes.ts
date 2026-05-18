import { Router } from 'express';
import * as tagController from '../controllers/tag.controller.js';

const router = Router();

router.get('/', tagController.getTags);
router.post('/', tagController.addTag);
router.delete('/:id', tagController.deleteTag);
router.put('/:id', tagController.updateTag);

export default router;
