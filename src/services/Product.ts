import { Pagination } from '../interfaces/Pagination';
import { Product } from '../interfaces/Product';
import api from './Api';
import { paginationToQueryParams } from '../utils/Pagination';

const productsPath = '/products';

export const getProducts = async (
  pagination: Pagination,
): Promise<Product[]> => {
  const response = await api.get(productsPath, {
    params: paginationToQueryParams(pagination),
  });

  return response.data?.data ?? [];
};

export const getProductByID = async (productID: string): Promise<Product> => {
  const response = await api.get(`${productsPath}/${productID}`);

  return response.data;
};
