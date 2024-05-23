import { sharedColors } from '../../utils/Style';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { showNavigationBarAtom } from '../../atoms/NavigationBar';
import { useEffect } from 'react';

const TopMenuMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNavigationBar, setShowNavigationBar] = useRecoilState(
    showNavigationBarAtom,
  );

  useEffect(() => {
    setShowNavigationBar(false);
  }, [location, setShowNavigationBar]);

  return (
    <Box
      component='div'
      sx={{
        backgroundColor: sharedColors.white,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        py: 1.5,
        px: 1.5,
      }}
    >
      <IconButton onClick={() => setShowNavigationBar(!showNavigationBar)}>
        <MenuIcon />
      </IconButton>
      <Box
        component='img'
        onClick={() => navigate('/')}
        alt=''
        src='https://demo4techies.com/prestashop/shopkart-lite/img/shopkart-lite-logo-1561444415.jpg'
        sx={{ height: 55, width: 'auto', cursor: 'pointer', ml: 1 }}
      />
      <Box component='div' sx={{ flexGrow: 1 }} />
      <IconButton>
        <PersonOutlineOutlinedIcon />
      </IconButton>
      <IconButton>
        <ShoppingCartOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default TopMenuMobile;
