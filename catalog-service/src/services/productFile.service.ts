import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export type SavedProductImage = {
  imageFileName: string;
  imageUrl: string;
};

export async function saveProductImage(file: Express.Multer.File): Promise<SavedProductImage> {
  // In a real application, you would save the file to a storage service (e.g., AWS S3, local filesystem)
  // and generate a URL for the saved image. For this example, we'll just return a mock URL.

  const extension = path.extname(file.originalname);
  const imageFileName = `${crypto.randomUUID()}${extension}`;

  const uploadDir = path.join(process.cwd(), 'public/products');
  const filePath = path.join(uploadDir, imageFileName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, file.buffer);

  return {
    imageFileName,
    imageUrl: `/products/${imageFileName}`,
  };
};

export async function deleteProductImage(imageFileName: string): Promise<void> {
  const filePath = path.join(process.cwd(), 'public/products', imageFileName);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete product image "${imageFileName}":`, error);
  }
};
