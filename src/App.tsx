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
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ProductDetailsPage from './components/Product/ProductDetailsPage';
import CategoryPage from './components/Category/CategoryPage';

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
      <Routes>
        <Route path='/home/*' element={<HomePage />} />
        <Route path='/product/:productID' element={<ProductDetailsPage />} />
        <Route path='/category/:categoryID' element={<CategoryPage />} />
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </Box>
  );
};

export default App;
