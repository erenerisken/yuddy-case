import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/Product';
import { getProducts } from '../../services/Product';
import { isEmpty } from 'lodash';
import { Box, Grid, Typography } from '@mui/material';
import { sharedColors, sharedStyles } from '../../utils/Style';
import ProductCard from '../Product/ProductCard';

const FeaturedProductsSection = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({
      pageNumber: 1,
      pageSize: 8,
    })
      .then((fetchedProducts) => setProducts(fetchedProducts))
      .catch((err) => console.error(err.message));
  }, []);

  return isEmpty(products) ? (
    <></>
  ) : (
    <Box
      component='div'
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          ...sharedStyles.h2,
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          textTransform: 'uppercase',
          mb: 2.5,
        }}
      >
        {t('homepage.featured_products')}
      </Typography>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Box
          component='div'
          sx={{
            width: '100px',
            height: '3px',
            backgroundColor: sharedColors.orange1,
          }}
        />
      </Box>
      <Box
        component='div'
        sx={{
          ...sharedStyles.horizontalSpan,
          pt: 5,
        }}
      >
        <Grid container spacing={3.5}>
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturedProductsSection;
