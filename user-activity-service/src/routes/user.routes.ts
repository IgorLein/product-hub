import { Router } from 'express';
import { getSimilarUsers } from '../controllers/similarUsers.controller';

const router = Router();

router.get('/:userId/similar-users', getSimilarUsers);

export default router;
