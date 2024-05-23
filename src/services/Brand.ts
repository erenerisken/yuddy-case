import { Brand } from '../interfaces/Brand';
import api from './Api';
import { Pagination } from '../interfaces/Pagination';
import { paginationToQueryParams } from '../utils/Pagination';

const brandsPath = '/brands';

export const getBrands = async (pagination?: Pagination): Promise<Brand[]> => {
  const response = await api.get(
    brandsPath,
    pagination ? { params: paginationToQueryParams(pagination) } : undefined,
  );

  return (pagination ? response.data?.data : response.data) ?? [];
};

export const getBrandByID = async (brandID: number): Promise<Brand> => {
  const response = await api.get(`${brandsPath}/${brandID}`);

  return response.data;
};
