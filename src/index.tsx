import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import createCache from '@emotion/cache';

import './index.css';
import App from './App';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <CacheProvider value={muiCache}>
    <ThemeProvider theme={createTheme()}>
      <App />
    </ThemeProvider>
  </CacheProvider>,
);
