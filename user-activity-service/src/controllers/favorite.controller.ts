import { Request, Response } from 'express';
import * as favoriteService from '../services/favorite.service';

export async function addFavorite(req: Request, res: Response) {
  const result = await favoriteService.addFavorite(req.body);
  res.status(201).json(result);
}

export async function getFavorites(req: Request, res: Response) {
  const result = await favoriteService.getFavorites(req.query.userId as string);
  res.json(result);
}
