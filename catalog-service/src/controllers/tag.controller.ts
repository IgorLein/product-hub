import { Request, Response, NextFunction } from "express";
import * as tagService from '../services/tag.service.js';

export async function getTags(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tags = await tagService.getTags();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

export async function getTagsByProductId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ message: 'Invalid product ID' });
      return;
    }

    const tags = await tagService.getTagsByProductId(productId);
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};
