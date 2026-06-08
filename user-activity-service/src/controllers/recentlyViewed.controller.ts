import { Request, Response } from 'express';
import * as recentlyViewedService from '../services/recentlyViewed.service';

export async function addRecentlyViewed(req: Request, res: Response) {
  const result = await recentlyViewedService.addRecentlyViewed(req.body);
  res.status(201).json(result);
}

export async function getRecentlyViewed(req: Request, res: Response) {
  const result = await recentlyViewedService.getRecentlyViewed(req.query.userId as string);
  res.json(result);
}
