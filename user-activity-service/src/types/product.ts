export type CategoryDto = {
  id: number;
  key: string;
  name: string;
};

export type TagDto = {
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

export type PaginationMeta = {
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: PaginationMeta;
};
