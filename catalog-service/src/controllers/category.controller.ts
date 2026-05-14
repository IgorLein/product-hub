import { Request, Response, NextFunction } from "express";
import * as categoryService from '../services/category.service.js';

export async function getCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}
