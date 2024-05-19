import { atom } from 'recoil';
import { Currency } from '../interfaces/Currency';

export const currencyAtom = atom({
  key: 'currency',
  default: Currency.TRY,
});
