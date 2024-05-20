import { atom } from 'recoil';
import { Category } from '../interfaces/Category';

export const categoriesAtom = atom({
  key: 'categories',
  default: [] as Category[],
});
