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

export async function addCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { key, name } = req.body;
    if (!name || !key || typeof name !== 'string' || typeof key !== 'string') {
      res.status(400).json({ message: 'Invalid category data' });
      return;
    }

    const newCategory = await categoryService.addCategory({ name, key });
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categoryId = Number(req.params.id);
    if (isNaN(categoryId)) {
      res.status(400).json({ message: 'Invalid category ID' });
      return;
    }

    await categoryService.deleteCategory(categoryId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categoryId = Number(req.params.id);
    if (isNaN(categoryId)) {
      res.status(400).json({ message: 'Invalid category ID' });
      return;
    }

    const { name, key } = req.body;
    if ((name && typeof name !== 'string') || (key && typeof key !== 'string')) {
      res.status(400).json({ message: 'Invalid category data' });
      return;
    }

    const updatedCategory = await categoryService.updateCategory(categoryId, { name, key });
    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};
