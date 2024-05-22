import { Box, Button, Fade, IconButton, Typography } from '@mui/material';
import { Product } from '../../interfaces/Product';
import { useRecoilValue } from 'recoil';
import { currencyAtom } from '../../atoms/Currency';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/Currency';
import { sharedColors } from '../../utils/Style';
import { isFinite } from 'lodash';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductTags } from '../../utils/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const currency = useRecoilValue(currencyAtom);

  const [hovering, setHovering] = useState(false);
  const containerRef = React.useRef<HTMLElement>(null);

  const handleNavigate = () => {
    navigate(`/product/${props.product.id}`);
  };

  const [leftTags, rightTags] = getProductTags(t, props.product, {
    xs: '9px',
    sm: '9px',
    md: '11px',
    lg: '13px',
    xl: '13px',
  });

  return (
    <Box
      component='div'
      sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Box
        component='img'
        src={props.product.images[0]}
        alt={props.product.name}
        onClick={handleNavigate}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        sx={{ cursor: 'pointer' }}
        ref={containerRef}
      />
      <Fade in={hovering} timeout={500}>
        <IconButton
          onClick={handleNavigate}
          onMouseEnter={() => setHovering(true)}
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: sharedColors.black,
            color: sharedColors.white,
            '&:hover': {
              backgroundColor: sharedColors.orange1,
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Fade>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          position: 'absolute',
        }}
      >
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
          {leftTags}
        </Box>
        <Box
          component='div'
          sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
        />
        <Box
          component='div'
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}
        >
          {rightTags}
        </Box>
      </Box>
      <Typography
        onClick={handleNavigate}
        sx={{
          fontSize: '0.9375rem',
          textTransform: 'uppercase',
          fontWeight: 600,
          flexGrow: 1,
          textAlign: 'center',
          mt: 1.5,
          cursor: 'pointer',
          transition: '0.5s',
          '&:hover': {
            color: sharedColors.orange1,
          },
        }}
      >
        {props.product.name}
      </Typography>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          justifyContent: 'center',
          mt: 2,
        }}
      >
        {isFinite(props.product.discountedPrice) && (
          <Typography
            sx={{
              color: sharedColors.gray2,
              fontSize: '0.875rem',
              textDecoration: 'line-through',
              mt: 0.15,
              mr: 0.5,
            }}
          >
            {formatCurrency(t, currency, props.product.basePrice)}
          </Typography>
        )}
        <Typography
          sx={{
            color: sharedColors.orange1,
            fontSize: '0.9375rem',
            fontWeight: 600,
          }}
        >
          {formatCurrency(
            t,
            currency,
            props.product.discountedPrice ?? props.product.basePrice,
          )}
        </Typography>
      </Box>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          justifyContent: 'center',
          mt: 2,
          mb: 2,
        }}
      >
        <Button
          variant='contained'
          sx={{
            width: { xs: '100%', sm: '90%', md: '80%', lg: '70%', xl: '70%' },
            borderRadius: 0,
            backgroundColor: sharedColors.black,
            color: sharedColors.white,
            fontSize: '13px',
            fontWeight: 700,
            transition: '0.5s',
            '&:hover': {
              backgroundColor: sharedColors.orange1,
            },
          }}
        >
          {t('product.add_to_cart')}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
