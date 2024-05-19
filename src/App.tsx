import React, { useEffect } from 'react';
import './App.css';
import { Box } from '@mui/material';
import AppHeader from './components/AppHeader';
import { useSetRecoilState } from 'recoil';
import { currencyAtom } from './atoms/Currency';
import { getStoredCurrency } from './utils/Currency';

const App = () => {
  const setCurrency = useSetRecoilState(currencyAtom);

  useEffect(() => {
    setCurrency(getStoredCurrency());
  }, [setCurrency]);

  return (
    <Box component='div'>
      <AppHeader />
    </Box>
  );
};

export default App;
