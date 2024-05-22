import { Box } from '@mui/material';
import BannerCarousel from './BannerCarousel';
import BrandsSection from './BrandsSection';
import FeaturedProductsSection from './FeaturedProductsSection';

const HomePage = () => {
  return (
    <Box component='div'>
      <BannerCarousel />
      <FeaturedProductsSection />
      <BrandsSection />
    </Box>
  );
};

export default HomePage;
