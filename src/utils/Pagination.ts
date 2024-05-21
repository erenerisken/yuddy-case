import { Pagination } from '../interfaces/Pagination';

export const paginationToQueryParams = (pagination: Pagination) => ({
  _page: pagination.pageNumber,
  _per_page: pagination.pageSize,
});
