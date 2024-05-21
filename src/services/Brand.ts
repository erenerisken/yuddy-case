import { Brand } from '../interfaces/Brand';
import api from './Api';
import { Pagination } from '../interfaces/Pagination';
import { paginationToQueryParams } from '../utils/Pagination';

export const getBrands = async (pagination?: Pagination): Promise<Brand[]> => {
  const response = await api.get(
    '/brands',
    pagination ? { params: paginationToQueryParams(pagination) } : undefined,
  );

  return response.data?.data ?? [];
};
