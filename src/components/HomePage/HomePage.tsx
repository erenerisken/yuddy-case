import { Box, Typography } from '@mui/material';
import BannerCarousel from './BannerCarousel';
import { useTranslation } from 'react-i18next';
import { sharedColors, sharedStyles } from '../../utils/Style';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Box component='div'>
      <BannerCarousel />
      <Typography
        sx={{
          ...sharedStyles.h2,
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          textTransform: 'uppercase',
          mt: 5,
          mb: 3,
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
    </Box>
  );
};

export default HomePage;
