export type CategoryDto = {
  id: number;
  key: string;
  name: string;
};

type TagDto = {
  id: number;
  key: string;
  name: string;
};

export type ProductDto = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: CategoryDto | null;
  tags: TagDto[];
};
