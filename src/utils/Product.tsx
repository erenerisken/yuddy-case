import { Product } from '../interfaces/Product';
import { sharedColors } from './Style';
import { Box } from '@mui/material';
import { isFinite } from 'lodash';
import React from 'react';
import { TFunction } from 'i18next';
import { SortCriteria } from '../interfaces/SortCriteria';
import { getStoredLanguage } from './Language';

export const getProductTags = (
  t: TFunction,
  product: Product,
  fontSize: object | string,
): JSX.Element[][] => {
  const leftTags = [];
  const rightTags = [];
  const commonTagStyle = {
    p: 0.5,
    color: sharedColors.white,
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize,
    mt: 0.75,
    mb: 1,
    mx: 0.75,
    borderRadius: 0.5,
    width: 'fit-content',
  };
  if (product.isOnSale) {
    rightTags.push(
      <Box
        component='div'
        sx={{
          backgroundColor: sharedColors.gray3,
          ...commonTagStyle,
        }}
      >
        {t('product.on_sale')}
      </Box>,
    );
  }
  if (product.isNewProduct) {
    leftTags.push(
      <Box
        component='div'
        sx={{
          backgroundColor: sharedColors.orange1,
          ...commonTagStyle,
        }}
      >
        {t('product.new_product')}
      </Box>,
    );
  }
  if (isFinite(product.discountRatio)) {
    rightTags.push(
      <Box
        component='div'
        sx={{
          backgroundColor: sharedColors.black,
          ...commonTagStyle,
        }}
      >
        {'-' + t('common.percentage', { value: product.discountRatio })}
      </Box>,
    );
  }

  return [leftTags, rightTags];
};

export const compareProducts = (
  p1: Product,
  p2: Product,
  criteria: SortCriteria,
): number => {
  switch (criteria) {
    case SortCriteria.NAME_A_Z:
      return p1.name.localeCompare(p2.name, getStoredLanguage());
    case SortCriteria.NAME_Z_A:
      return p2.name.localeCompare(p1.name, getStoredLanguage());
    case SortCriteria.PRICE_LOW_HIGH:
      return (
        (p1.discountedPrice ?? p1.basePrice) -
        (p2.discountedPrice ?? p2.basePrice)
      );
    case SortCriteria.PRICE_HIGH_LOW:
      return (
        (p2.discountedPrice ?? p2.basePrice) -
        (p1.discountedPrice ?? p1.basePrice)
      );
    default:
      return p1.id - p2.id;
  }
};
