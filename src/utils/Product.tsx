import { Product } from '../interfaces/Product';
import { sharedColors } from './Style';
import { Box } from '@mui/material';
import { isFinite } from 'lodash';
import React from 'react';
import { TFunction } from 'i18next';

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
