import { Request, Response } from 'express';
import * as recentlyViewedService from '../services/recentlyViewed.service';

export async function addRecentlyViewed(req: Request, res: Response) {
  const userId = req.params.userId as string | undefined;
  const productId = req.body.productId as number | undefined;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId (path param)'});
  }

  if (!productId) {
    return res.status(400).json({ error: 'Missing productId in request body' });
  }

  await recentlyViewedService.addRecentlyViewed(userId, productId);
  res.status(201).json({ message: 'Recently viewed item added successfully' });
}

export async function getRecentlyViewed(req: Request, res: Response) {
  const result = await recentlyViewedService.getRecentlyViewed(req.params.userId as string);
  res.json(result);
}

export async function removeRecentlyViewed(req: Request, res: Response) {
  const userId = req.params.userId as string | undefined;
  const productId = req.body.productId as number | undefined;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId (path param)'});
  }

  if (!productId) {
    return res.status(400).json({ error: 'Missing productId in request body' });
  }

  await recentlyViewedService.removeRecentlyViewed(userId, productId);
  res.status(200).json({ message: 'Recently viewed item removed successfully' });
}
