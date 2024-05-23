import { Banner } from '../interfaces/Banner';
import api from './Api';
import { transformNumericID } from '../utils/Api';

export const getBanners = async (): Promise<Banner[]> => {
  const response = await api.get('/banners');

  return (response.data ?? []).map((banner: any) => transformNumericID(banner));
};
