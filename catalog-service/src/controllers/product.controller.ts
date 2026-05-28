import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service.js';
import * as productFileService from '../services/productFile.service.js';
import { getPaginationParams } from '../utils/pagination.js';
import { CreationProductData, CreationProductDataWithTags } from '../services/product.service.js';

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

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.file) {
    res.status(400).json({ message: 'Product image is required' });
    return;
  }

  const savedImage = await productFileService.saveProductImage(req.file);
  
  const productData: CreationProductData = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price),
    categoryId: parseInt(req.body.categoryId, 10),
    imageFileName: savedImage.imageFileName,
    imageUrl: savedImage.imageUrl,
    tagIds: req.body.tagIds ? req.body.tagIds.split(',').map((id: string) => parseInt(id, 10)) : [],
  };

  try {
    const createdProduct = await productService.createProduct(productData);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
}

export async function createProductWithTags(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.file) {
    res.status(400).json({ message: 'Product image is required' });
    return;
  }

  const savedImage = await productFileService.saveProductImage(req.file);
  
  const productData: CreationProductDataWithTags = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price),
    categoryId: parseInt(req.body.categoryId, 10),
    imageFileName: savedImage.imageFileName,
    imageUrl: savedImage.imageUrl,
    tagKeys: req.body.tagKeys ? req.body.tagKeys.split(',') : [],
  };

  try {
    const createdProduct = await productService.createProductWithTags(productData);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(
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

    await productService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
