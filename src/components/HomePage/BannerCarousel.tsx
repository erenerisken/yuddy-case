import { useEffect, useState } from 'react';
import { Banner } from '../../interfaces/Banner';
import { getBanners } from '../../services/Banner';
import { Box, Button, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { isEmpty } from 'lodash';
import { sharedColors } from '../../utils/Style';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '../../atoms/Category';
import { useNavigate } from 'react-router-dom';

const BannerCarousel = () => {
  const navigate = useNavigate();

  const categories = useRecoilValue(categoriesAtom);

  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    getBanners()
      .then((fetchedBanners) => setBanners(fetchedBanners))
      .catch((err) => console.error(err.message));
  }, []);

  return isEmpty(banners) ? (
    <></>
  ) : (
    <Box>
      <Carousel
        showThumbs={false}
        autoPlay
        interval={5000}
        infiniteLoop
        showIndicators={false}
        showStatus={false}
      >
        {banners.map((banner, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            <Box component='img' src={banner.image} alt={banner.h1 ?? ''} />
            <Box
              component='div'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: '50%',
                left: '60%',
                transform: 'translate(0, -50%)',
                alignItems: 'left',
              }}
            >
              {banner.h1 && (
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      xs: 16,
                      sm: 20,
                      md: 24,
                    },
                    letterSpacing: '1px',
                    width: 'fit-content',
                    textAlign: 'left',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {banner.h1}
                </Typography>
              )}
              {banner.h2 && (
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: {
                      xs: 18,
                      sm: 24,
                      md: 32,
                      lg: 48,
                      xl: 60,
                    },
                    width: 'fit-content',
                    textAlign: 'left',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.15,
                  }}
                >
                  {banner.h2}
                </Typography>
              )}
              {banner.h3 && (
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: {
                      xs: 13,
                      sm: 14,
                      md: 16,
                    },
                    width: 'fit-content',
                    textAlign: 'left',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {banner.h3}
                </Typography>
              )}
              <Button
                variant='contained'
                onClick={
                  !isEmpty(categories)
                    ? () => navigate(`/category/${categories[0].id}`)
                    : undefined
                }
                sx={{
                  color: sharedColors.white,
                  backgroundColor: sharedColors.orange1,
                  borderRadius: 0,
                  mt: {
                    xs: 1,
                    sm: 1.5,
                    md: 3.5,
                    lg: 4.5,
                    xl: 4.5,
                  },
                  fontWeight: 500,
                  fontSize: {
                    xs: 12,
                    sm: 12,
                    md: 15,
                    lg: 16,
                    xl: 16,
                  },
                  px: {
                    sm: 6,
                    md: 9,
                  },
                  py: {
                    sm: 1.5,
                    md: 2,
                  },
                  width: 'fit-content',
                }}
              >
                {banner.buttonText}
              </Button>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default BannerCarousel;
