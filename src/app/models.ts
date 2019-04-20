export class Models {
}

export interface Comments {
  id: string;
  reporter: string;
  description: string;
}
export interface Bug {
  id: string;
  title: string;
  description: string;
  priority: string;
  reporter: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  comments: Comments;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
