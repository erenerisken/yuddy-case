import { Product } from '../../interfaces/Product';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getProductVariants } from '../../services/Product';
import { Box, Grid, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import ProductCard from './ProductCard';

interface ProductVariantsSectionProps {
  product: Product;
}

const ProductVariantsSection = (props: ProductVariantsSectionProps) => {
  const { t } = useTranslation();

  const [variants, setVariants] = useState<Product[]>([]);

  useEffect(() => {
    getProductVariants(props.product.id)
      .then((fetchedVariants) => setVariants(fetchedVariants))
      .catch((err) => console.error(err.message));
  }, [props.product]);

  console.log('variants', variants);

  return isEmpty(variants) ? (
    <></>
  ) : (
    <Box
      component='div'
      sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}
    >
      <Typography
        sx={{
          display: 'flex',
          flexGrow: 1,
          textTransform: 'uppercase',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: '1.375rem',
        }}
      >
        {t('product.you_might_also_like')}
      </Typography>
      <Grid container spacing={3.5}>
        {variants.map((product) => (
          <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductVariantsSection;
