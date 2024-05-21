import { useEffect, useState } from 'react';
import { Brand } from '../../interfaces/Brand';
import { getBrands } from '../../services/Brand';
import { isEmpty } from 'lodash';
import { Box, Typography } from '@mui/material';
import { sharedColors, sharedStyles } from '../../utils/Style';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const BrandsSection = () => {
  const { t } = useTranslation();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [highlightedItem, setHighlightedItem] = useState(1);

  useEffect(() => {
    getBrands({
      pageNumber: 1,
      pageSize: 10,
    })
      .then((fetchedBrands) => setBrands(fetchedBrands))
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    if (highlightedItem === brands.length - 2) {
      setTimeout(() => setHighlightedItem(1), 4500);
    }
  }, [highlightedItem, brands]);

  return isEmpty(brands) ? (
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
          mb: 3,
          '&:hover': {
            color: sharedColors.orange1,
          },
          cursor: 'pointer',
        }}
      >
        {t('homepage.brands.title')}
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
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: { xs: 360, sm: 540, md: 720, lg: 960, xl: 1140 },
          pt: 3,
        }}
      >
        <Carousel
          showThumbs={false}
          autoPlay
          interval={5000}
          infiniteLoop
          showIndicators={false}
          showStatus={false}
          centerMode
          centerSlidePercentage={20}
          selectedItem={highlightedItem}
          onChange={(newIndex) => setHighlightedItem(newIndex)}
        >
          {brands.map((brand, index) => (
            <Box
              key={index}
              component='img'
              src={brand.logo.md}
              alt={brand.name}
            />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default BrandsSection;
