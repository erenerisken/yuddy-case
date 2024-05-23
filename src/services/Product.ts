import { Pagination } from '../interfaces/Pagination';
import { Product } from '../interfaces/Product';
import api from './Api';
import { paginationToQueryParams } from '../utils/Pagination';
import { transformNumericID } from '../utils/Api';

const productsPath = '/products';

export const getProducts = async (
  pagination: Pagination,
): Promise<Product[]> => {
  const response = await api.get(productsPath, {
    params: paginationToQueryParams(pagination),
  });

  return (response.data?.data ?? []).map((product: any) =>
    transformNumericID(product),
  );
};

export const getProductByID = async (productID: number): Promise<Product> => {
  const response = await api.get(`${productsPath}/${productID}`);

  return transformNumericID(response.data);
};

export const getProductVariants = async (
  productID: number,
): Promise<Product[]> => {
  //Mock implementation
  const response = await api.get(productsPath);

  return response.data
    .slice(productID + 1, productID + 5)
    .map((product: any) => transformNumericID(product));
};
