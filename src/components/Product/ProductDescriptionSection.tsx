import { Product } from '../../interfaces/Product';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { sharedColors } from '../../utils/Style';
import { Brand } from '../../interfaces/Brand';
import { getBrandByID } from '../../services/Brand';
import { flatten, isEmpty } from 'lodash';

interface ProductDescriptionSectionProps {
  product: Product;
}

const ProductDescriptionSection = (props: ProductDescriptionSectionProps) => {
  const { t } = useTranslation();

  const [brand, setBrand] = useState<Brand | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getBrandByID(props.product.brandID)
      .then((fetchedBrand) => setBrand(fetchedBrand))
      .catch((err) => console.error(err.message));
  }, [props.product]);

  console.log(props.product);

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        border: '2px solid #e1e1e1',
      }}
    >
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          borderBottom: '2px solid #e1e1e1',
        }}
      >
        <Box
          component='div'
          onClick={() => setShowDetails(false)}
          sx={{
            border: '1px solid #e1e1e1',
            p: 1.5,
            fontSize: '16px',
            fontWeight: 700,
            backgroundColor: showDetails
              ? sharedColors.gray5
              : sharedColors.white,
            color: showDetails ? sharedColors.gray2 : sharedColors.black,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: sharedColors.white,
              color: sharedColors.black,
            },
          }}
        >
          {t('product.description')}
        </Box>
        <Box
          component='div'
          onClick={() => setShowDetails(true)}
          sx={{
            border: '1px solid #e1e1e1',
            p: 1.5,
            fontSize: '16px',
            fontWeight: 700,
            backgroundColor: showDetails
              ? sharedColors.white
              : sharedColors.gray5,
            color: showDetails ? sharedColors.black : sharedColors.gray2,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: sharedColors.white,
              color: sharedColors.black,
            },
          }}
        >
          {t('product.details')}
        </Box>
      </Box>
      {showDetails ? (
        <Box
          component='div'
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2.5 }}
        >
          {brand && (
            <Box
              component='img'
              src={brand.logo.md}
              alt={brand.name}
              width={240}
              height='auto'
              sx={{ border: '1px solid #ddd', cursor: 'pointer', mb: 1.5 }}
            />
          )}
          <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>
            {t('product.reference')}
          </Typography>
          <Box
            component='div'
            sx={{ mt: 1, display: 'flex', flexDirection: 'row', flexGrow: 1 }}
          >
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, mr: 0.5 }}>
              {t('product.in_stock')}
            </Typography>
            <Typography sx={{ fontSize: '14ox', fontWeight: 400 }}>
              {props.product.stock === 1
                ? t('product.one_item')
                : t('product.n_items', { n: props.product.stock })}
            </Typography>
          </Box>
          {!isEmpty(Object.keys(props.product.specification)) && (
            <Grid container spacing={1.5} sx={{ mt: 1.5 }}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: '.9375rem', fontWeight: 600 }}>
                  {t('product.data_sheet')}
                </Typography>
              </Grid>
              {flatten(
                Object.keys(props.product.specification).map((key, i) => [
                  <Grid item xs={6}>
                    <Box
                      component='div'
                      sx={{
                        p: 1.5,
                        flexGrow: 1,
                        backgroundColor:
                          i % 2 === 0 ? sharedColors.gray5 : sharedColors.gray6,
                        fontWeight: 400,
                        fontSize: '14px',
                      }}
                    >
                      {key}
                    </Box>
                  </Grid>,
                  <Grid item xs={6}>
                    <Box
                      component='div'
                      sx={{
                        p: 1.5,
                        flexGrow: 1,
                        backgroundColor:
                          i % 2 === 0 ? sharedColors.gray5 : sharedColors.gray6,
                        fontWeight: 400,
                        fontSize: '14px',
                      }}
                    >
                      {props.product.specification[key]}
                    </Box>
                  </Grid>,
                ]),
              )}
            </Grid>
          )}
          <Typography sx={{ fontSize: '.9375rem', fontWeight: 600, mt: 2.5 }}>
            {t('product.specific_references')}
          </Typography>
        </Box>
      ) : (
        <Typography
          sx={{
            whiteSpace: 'pre-line',
            p: 2.5,
            color: sharedColors.gray1,
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          {props.product.description}
        </Typography>
      )}
    </Box>
  );
};

export default ProductDescriptionSection;
