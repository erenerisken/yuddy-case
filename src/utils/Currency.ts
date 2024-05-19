import { Currency } from '../interfaces/Currency';

export const getStoredCurrency = (): Currency =>
  (localStorage.getItem('currency') as Currency) ?? Currency.TRY;
