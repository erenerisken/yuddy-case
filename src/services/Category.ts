import { Category } from '../interfaces/Category';
import api from './Api';

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');

  return response.data ?? [];
};
