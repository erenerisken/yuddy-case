import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Product } from '../../interfaces/Product';
import { getProductByID } from '../../services/Product';
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Link,
  Skeleton,
  Typography,
} from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { sharedColors, sharedStyles } from '../../utils/Style';
import { useTranslation } from 'react-i18next';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { getProductTags } from '../../utils/Product';
import { isFinite, parseInt } from 'lodash';
import { formatCurrency } from '../../utils/Currency';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useRecoilValue } from 'recoil';
import { currencyAtom } from '../../atoms/Currency';
import QuantityInput from './QuantityInput';
import WarningIcon from '@mui/icons-material/Warning';
import ProductPolicyNote from './ProductPolicyNote';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import { Carousel } from 'react-responsive-carousel';
import ProductDescriptionSection from './ProductDescriptionSection';
import ProductVariantsSection from './ProductVariantsSection';

const ProductDetailsPage = () => {
  const { t } = useTranslation();

  const currency = useRecoilValue(currencyAtom);

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const containerRef = React.useRef<HTMLElement>(null);

  const { productID } = useParams<string>();

  useEffect(() => {
    if (!productID) {
      return;
    }

    setLoading(true);
    getProductByID(parseInt(productID))
      .then((productDetails) => setProduct(productDetails))
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, [productID]);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
  }, [product]);

  const [leftTags, rightTags] = product
    ? getProductTags(t, product, '16px')
    : [[], []];

  const insufficientStock = (product?.stock ?? 0) < quantity;

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        pb: 5,
      }}
    >
      <Box component='div' sx={{ ...sharedStyles.horizontalSpan }}>
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            mt: 2.5,
          }}
        >
          {product && (
            <Breadcrumbs sx={{ mb: 2 }}>
              <Link
                underline='hover'
                color='inherit'
                href='/'
                sx={sharedStyles.breadcrumbs}
              >
                {t('breadcrumbs.home')}
              </Link>
              <Typography sx={sharedStyles.breadcrumbs}>
                {product.name}
              </Typography>
            </Breadcrumbs>
          )}
          {loading && (
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <Box component='div'>
                  <Skeleton variant='rectangular' height={600} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component='div'
                  sx={{ display: 'flex', flexDirection: 'column', height: 750 }}
                >
                  <Skeleton variant='rectangular' height={50} />
                  <Skeleton
                    variant='rectangular'
                    height={100}
                    width='30%'
                    sx={{ mt: 1.5 }}
                  />
                  <Skeleton
                    variant='rectangular'
                    height={250}
                    sx={{ mt: 1.5 }}
                  />
                  <Skeleton
                    variant='rectangular'
                    height={100}
                    width='50%'
                    sx={{ mt: 1.5 }}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
          {product && (
            <Grid container spacing={2.5} sx={{ maxWidth: '93vw' }}>
              <Grid item xs={12} md={6}>
                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <Box
                    component='img'
                    src={product.images[selectedImage]}
                    alt={product.name}
                    sx={{ border: '1px solid #e1e1e1' }}
                    ref={containerRef}
                  />
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      position: 'absolute',
                    }}
                  >
                    <Box
                      component='div'
                      sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                      {leftTags}
                    </Box>
                    <Box
                      component='div'
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexGrow: 1,
                      }}
                    />
                    <Box
                      component='div'
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                      }}
                    >
                      {rightTags}
                    </Box>
                  </Box>
                  <Box component='div' sx={{ mt: 2 }} />
                  <Carousel
                    showThumbs={false}
                    showIndicators={false}
                    showStatus={false}
                    selectedItem={1}
                    infiniteLoop
                    centerMode
                    centerSlidePercentage={25}
                    onClickItem={(i) => setSelectedImage(i)}
                  >
                    {product.images.map((image, index) => (
                      <Box
                        sx={{
                          m: 1.5,
                          border:
                            index === selectedImage
                              ? '2px solid #333333'
                              : undefined,
                          cursor: 'pointer',
                          '&:hover': {
                            border: '2px solid #333333',
                          },
                        }}
                      >
                        <Box key={index} component='img' src={image} alt='' />
                      </Box>
                    ))}
                  </Carousel>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    sx={{
                      ...sharedStyles.h1,
                      textTransform: 'uppercase',
                      mb: 2,
                    }}
                  >
                    {product.name}
                  </Typography>
                  {isFinite(product.discountedPrice) && (
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: '20px',
                        textDecoration: 'line-through',
                        mb: 0.5,
                      }}
                    >
                      {formatCurrency(t, currency, product.basePrice)}
                    </Typography>
                  )}
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexGrow: 1,
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: sharedColors.orange1,
                        mr: 1.5,
                      }}
                    >
                      {formatCurrency(
                        t,
                        currency,
                        product.discountedPrice ?? product.basePrice,
                      )}
                    </Typography>
                    {isFinite(product.discountRatio) && (
                      <Box
                        component='div'
                        sx={{
                          backgroundColor: sharedColors.orange1,
                          color: sharedColors.white,
                          p: 1,
                          fontWeight: 600,
                          fontSize: '13px',
                          borderRadius: 1,
                          textTransform: 'uppercase',
                        }}
                      >
                        {t('product.discount_ratio', {
                          ratio: product.discountRatio,
                        })}
                      </Box>
                    )}
                  </Box>
                  <Divider />
                  <Typography
                    sx={{
                      fontSize: '14px',
                      lineHeight: '21px',
                      textAlign: 'justify',
                      whiteSpace: 'pre-line',
                      color: sharedColors.gray1,
                      mt: 2,
                    }}
                  >
                    {product.summary}
                  </Typography>
                  <Typography
                    sx={{ mt: 2.5, fontWeight: 600, fontSize: '.9375rem' }}
                  >
                    {t('product.quantity')}
                  </Typography>
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexGrow: 1,
                      mt: 1.5,
                    }}
                  >
                    <Box component='div' sx={{ width: 85, mr: 1.5 }}>
                      <QuantityInput value={quantity} onChange={setQuantity} />
                    </Box>
                    <Button
                      variant='contained'
                      disabled={insufficientStock}
                      sx={{
                        px: 4.5,
                        borderRadius: 0,
                        backgroundColor: sharedColors.black,
                        '&:hover': {
                          backgroundColor: sharedColors.orange1,
                        },
                      }}
                    >
                      {t('product.add_to_cart')}
                    </Button>
                    {product.stock < 3 && !insufficientStock && (
                      <Box
                        component='div'
                        sx={{
                          mt: 'auto',
                          mb: 'auto',
                          ml: 2.5,
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <WarningIcon
                          fontSize='small'
                          sx={{ color: sharedColors.orange2 }}
                        />
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: '.9375rem',
                            ml: 0.75,
                          }}
                        >
                          {t('product.last_items_in_stock')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  {insufficientStock && (
                    <Box
                      component='div'
                      sx={{
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        mt: 1,
                      }}
                    >
                      <DoDisturbIcon
                        fontSize='small'
                        sx={{ color: sharedColors.orange2 }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '.9375rem',
                          ml: 0.75,
                        }}
                      >
                        {t('product.insufficient_stock')}
                      </Typography>
                    </Box>
                  )}
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      flexGrow: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      mt: 3.5,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: '.9375rem' }}>
                      {t('product.share')}
                    </Typography>
                    <Box sx={sharedStyles.shareButton}>
                      <FacebookOutlinedIcon />
                    </Box>
                    <Box sx={sharedStyles.shareButton}>
                      <TwitterIcon />
                    </Box>
                    <Box sx={sharedStyles.shareButton}>
                      <PinterestIcon />
                    </Box>
                  </Box>
                  <Box component='div' sx={{ mt: 3 }} />
                  <ProductPolicyNote
                    icon={
                      <LockOutlinedIcon
                        fontSize='large'
                        sx={{ color: sharedColors.orange1 }}
                      />
                    }
                    title={t('product.policy_security')}
                  />
                  <ProductPolicyNote
                    icon={
                      <LocalShippingOutlinedIcon
                        fontSize='large'
                        sx={{ color: sharedColors.orange1 }}
                      />
                    }
                    title={t('product.policy_delivery')}
                  />
                  <ProductPolicyNote
                    icon={
                      <RestoreOutlinedIcon
                        fontSize='large'
                        sx={{ color: sharedColors.orange1 }}
                      />
                    }
                    title={t('product.policy_return')}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <ProductDescriptionSection product={product} />
              </Grid>
              <Grid item xs={12}>
                <ProductVariantsSection product={product} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
