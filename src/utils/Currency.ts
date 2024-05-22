import { Currency } from '../interfaces/Currency';
import { TFunction } from 'i18next';
import getSymbolFromCurrency from 'currency-symbol-map';

export const formatCurrency = (
  t: TFunction,
  currency: Currency,
  amount: number,
) =>
  t('common.currency', {
    symbol: getSymbolFromCurrency(currency),
    amount: (amount / 100).toFixed(2),
  });

export const getStoredCurrency = (): Currency =>
  (localStorage.getItem('currency') as Currency) ?? Currency.TRY;
