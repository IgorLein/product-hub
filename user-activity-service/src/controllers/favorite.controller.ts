import { NextFunction, Request, Response } from 'express';
import * as favoriteService from '../services/favorite.service';

export async function addFavorite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req.params.userId || req.query.userId) as string | undefined;
    const productId = req.body.productId as string | undefined;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId (path param or query param)'});
    }

    if (!productId) {
      return res.status(400).json({ error: 'Missing productId in request body' });
    }

    console.log('addFavorite called with userId:', userId, 'and productId:', productId);
    await favoriteService.addFavorite(userId, productId);
    res.status(201).json({ message: 'Favorite added successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getFavorites(req: Request, res: Response) {
  const userId = (req.params.userId || req.query.userId) as string | undefined;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId (path param or query param)'});
  }

  const result = await favoriteService.getFavorites(userId);
  res.json(result);
}
