import { ProductFilter } from '../interfaces/ProductFilter';
import { SortCriteria } from '../interfaces/SortCriteria';

export const getDefaultProductFilters = (): ProductFilter => ({
  sortCriteria: SortCriteria.RELEVANCE,
  pagination: {
    pageNumber: 1,
    pageSize: 12,
  },
  brandIDs: [],
});
