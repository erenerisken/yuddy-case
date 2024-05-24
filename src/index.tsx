import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import createCache from '@emotion/cache';

import 'material-react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css';
import './i18n';
import App from './App';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'material-react-toastify';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <CacheProvider value={muiCache}>
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={createTheme()}>
          <App />
          <ToastContainer
            position='top-center'
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  </CacheProvider>,
);
