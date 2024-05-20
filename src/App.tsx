import React, { useEffect } from 'react';
import './App.css';
import { Box } from '@mui/material';
import AppHeader from './components/AppHeader';
import { useSetRecoilState } from 'recoil';
import { currencyAtom } from './atoms/Currency';
import { getStoredCurrency } from './utils/Currency';
import TopMenuDesktop from './components/TopMenu/TopMenuDesktop';
import { categoriesAtom } from './atoms/Category';
import { getCategories } from './services/Category';
import { toast } from 'material-react-toastify';
import NavigationBar from './components/NavigationBar/NavigationBar';

const App = () => {
  const setCategories = useSetRecoilState(categoriesAtom);
  const setCurrency = useSetRecoilState(currencyAtom);

  useEffect(() => {
    setCurrency(getStoredCurrency());
  }, [setCurrency]);

  useEffect(() => {
    getCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => toast.error(err.message));
  }, [setCategories]);

  return (
    <Box component='div'>
      <AppHeader />
      <TopMenuDesktop />
      <NavigationBar />
    </Box>
  );
};

export default App;
