export interface CategorySeed {
  key: string;
  name: string;
}

export interface TagSeed {
  key: string;
  name: string;
}

export interface ProductSeed {
  name: string;
  description: string;
  price: number;
  categoryKey: string;
  imageFileName: string;
  tagKeys: string[];
}

export interface CatalogSeedFile {
  categories: CategorySeed[];
  tags: TagSeed[];
  products: ProductSeed[];
}
