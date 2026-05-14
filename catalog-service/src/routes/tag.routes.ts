import { Router } from 'express';
import * as tagController from '../controllers/tag.controller.js';

const router = Router();

router.get('/', tagController.getTags);

export default router;
