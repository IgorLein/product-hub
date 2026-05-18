import { Request, Response, NextFunction } from "express";
import * as tagService from '../services/tag.service.js';
import { getPaginationParams } from "../utils/pagination.js";

export async function getTags(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const paginationParams = getPaginationParams(req.query);
    const tags = await tagService.getTags(paginationParams);
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

export async function addTag(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { key, name } = req.body;
    if (!name || !key || typeof name !== 'string' || typeof key !== 'string') {
      res.status(400).json({ message: 'Invalid tag data' });
      return;
    }

    const newTag = await tagService.addTag({ name, key });
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

export async function deleteTag(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tagId = Number(req.params.id);
    if (isNaN(tagId)) {
      res.status(400).json({ message: 'Invalid tag ID' });
      return;
    }
    
    await tagService.deleteTag(tagId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export async function updateTag(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tagId = Number(req.params.id);
    if (isNaN(tagId)) {
      res.status(400).json({ message: 'Invalid tag ID' });
      return;
    }

    const { name, key } = req.body;
    if ((name && typeof name !== 'string') || (key && typeof key !== 'string')) {
      res.status(400).json({ message: 'Invalid tag data' });
      return;
    }

    const updatedTag = await tagService.updateTag(tagId, { name, key });
    if (!updatedTag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(updatedTag);
  } catch (error) {
    next(error);
  }
};
