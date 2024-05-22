import { Pagination } from '../interfaces/Pagination';
import { Product } from '../interfaces/Product';
import api from './Api';
import { paginationToQueryParams } from '../utils/Pagination';

export const getProducts = async (
  pagination: Pagination,
): Promise<Product[]> => {
  const response = await api.get('/products', {
    params: paginationToQueryParams(pagination),
  });

  return response.data?.data ?? [];
};
