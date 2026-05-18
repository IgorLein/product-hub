import { Request, Response, NextFunction } from "express";
import * as categoryService from '../services/category.service.js';
import * as tagService from '../services/tag.service.js';
import { getPaginationParams } from '../utils/pagination.js';

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const paginationParams = getPaginationParams(req.query);

    const categories = await categoryService.getCategories(paginationParams);
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryTags(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categoryKey = req.params.categoryKey;
    if (!categoryKey || Array.isArray(categoryKey)) {
      res.status(400).json({ message: 'Invalid category key' });
      return;
    }

    const tags = await tagService.getTagsByCategoryKey(categoryKey);
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};
