export type PaginationParams = {
  page: number;
  limit: number;
  offset: number;
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

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 50;

export function getPaginationParams(query: {
  page?: unknown;
  limit?: unknown;
}): PaginationParams {
  const rawPage = Number(query.page);
  const rawLimit = Number(query.limit);

  const page = Number.isInteger(rawPage) && rawPage > 0
    ? rawPage
    : DEFAULT_PAGE;

  const limit = Number.isInteger(rawLimit) && rawLimit > 0
    ? Math.min(rawLimit, MAX_LIMIT)
    : DEFAULT_LIMIT;

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}

export function buildPaginationMeta(params: {
  page: number;
  limit: number;
  totalItems: number;
}): PaginationMeta {
  const totalPages = Math.ceil(params.totalItems / params.limit);

  return {
    page: params.page,
    limit: params.limit,
    totalItems: params.totalItems,
    totalPages,
    hasNextPage: params.page < totalPages,
    hasPreviousPage: params.page > 1,
  };
}

export function buildPaginatedResponse<T>(
  items: T[],
  params: {
    page: number;
    limit: number;
    totalItems: number;
  }
): PaginatedResponse<T> {
  return {
    items,
    pagination: buildPaginationMeta(params),
  };
}
