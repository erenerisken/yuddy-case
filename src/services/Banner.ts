import { Banner } from '../interfaces/Banner';
import api from './Api';

export const getBanners = async (): Promise<Banner[]> => {
  const response = await api.get('/banners');

  return response.data ?? [];
};
