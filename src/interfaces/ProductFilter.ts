import { SortCriteria } from './SortCriteria';
import { Pagination } from './Pagination';

export interface ProductFilter {
  sortCriteria: SortCriteria;
  pagination: Pagination;
  brandIDs: number[];
}
