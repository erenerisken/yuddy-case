import { Badge, Box, IconButton } from '@mui/material';
import { sharedColors, sharedStyles } from '../../utils/Style';
import SearchTextField from './SearchTextField';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const TopMenuDesktop = () => {
  const navigate = useNavigate();

  return (
    <Box
      component='div'
      sx={{
        backgroundColor: sharedColors.white,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        py: 1.5,
      }}
    >
      <Box component='div' sx={sharedStyles.horizontalSpan}>
        <Box
          component='img'
          onClick={() => navigate('/')}
          alt=''
          src='https://demo4techies.com/prestashop/shopkart-lite/img/shopkart-lite-logo-1561444415.jpg'
          sx={{ height: 80, width: 'auto', cursor: 'pointer' }}
        />
        <Box component='div' sx={{ flexGrow: 1 }} />
        <SearchTextField width={290} />
        <Box component='div' sx={{ mr: 0.75 }} />
        <IconButton>
          <Badge
            badgeContent={0}
            showZero
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: sharedColors.orange1,
                color: sharedColors.white,
                py: 0,
                px: 0.6,
                minWidth: 0,
                minHeight: 0,
                fontSize: '12px',
              },
            }}
          >
            <ShoppingCartIcon sx={{ color: sharedColors.black }} />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopMenuDesktop;
