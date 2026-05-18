import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service.js';
import { getPaginationParams } from '../utils/pagination.js';

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const tag = typeof req.query.tag === 'string' ? req.query.tag : undefined;
    const paginationParams = getPaginationParams(req.query);

    const products = await productService.getProducts({ category, tag, ...paginationParams });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid product ID' });
      return;
    }

    const product = await productService.getProductById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}
