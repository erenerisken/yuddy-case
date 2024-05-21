import { Box, Button, Popover, Typography } from '@mui/material';
import { sharedColors } from '../utils/Style';
import { getLanguageName, getStoredLanguage } from '../utils/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { Language } from '../interfaces/Language';
import { useRecoilState } from 'recoil';
import { currencyAtom } from '../atoms/Currency';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Currency } from '../interfaces/Currency';
import { useTranslation } from 'react-i18next';

const AppHeader = () => {
  const { t } = useTranslation();

  const [currency, setCurrency] = useRecoilState(currencyAtom);

  const [currencyAnchor, setCurrencyAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [languageAnchor, setLanguageAnchor] = useState<HTMLElement | null>(
    null,
  );

  const selectedLanguage = getStoredLanguage();

  const handleChangeLanguage = (newLanguage: Language) => {
    localStorage.setItem('language', newLanguage);
    window.location.reload();
  };

  const handleChangeCurrency = (newCurrency: Currency) => {
    localStorage.setItem('currency', newCurrency);
    setCurrency(newCurrency);
    setCurrencyAnchor(null);
  };

  const dropdownLabelStyle = {
    color: sharedColors.white,
    fontSize: '13px',
    fontWeight: 500,
  };

  const optionButtonStyle = {
    textTransform: 'none',
    color: sharedColors.white,
    minHeight: 0,
    p: 0,
    m: 0,
    '&:hover': {
      color: sharedColors.orange1,
    },
    fontSize: '14px',
    fontWeight: 500,
  };

  return (
    <Box
      component='div'
      sx={{
        backgroundColor: sharedColors.black,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        py: 2,
      }}
    >
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: { xs: 360, sm: 540, md: 720, lg: 960, xl: 1140 },
        }}
      >
        <Box
          component='div'
          onClick={(e) => setLanguageAnchor(e.currentTarget)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            mr: 1.5,
          }}
        >
          <Typography sx={{ ...dropdownLabelStyle }}>
            {getLanguageName(selectedLanguage)}
          </Typography>
          <KeyboardArrowDownIcon
            fontSize='small'
            sx={{ color: sharedColors.white }}
          />
        </Box>
        <Popover
          open={!!languageAnchor}
          anchorEl={languageAnchor}
          onClose={() => setLanguageAnchor(null)}
          disableScrollLock
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ mt: 2.5 }}
        >
          <Box
            component='div'
            sx={{
              width: 160,
              display: 'flex',
              flexDirection: 'column',
              p: 0.5,
            }}
          >
            {[Language.TR, Language.EN].map((language) => (
              <Button
                onClick={() => handleChangeLanguage(language)}
                sx={{
                  textTransform: 'none',
                  textAlign: 'left',
                  justifyContent: 'left',
                  fontSize: '13px',
                  fontWeight: 500,
                  color:
                    language === selectedLanguage
                      ? sharedColors.orange1
                      : sharedColors.black,
                }}
              >
                {getLanguageName(language)}
              </Button>
            ))}
          </Box>
        </Popover>
        <Box
          component='div'
          onClick={(e) => setCurrencyAnchor(e.currentTarget)}
          sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}
        >
          <Typography sx={{ ...dropdownLabelStyle }}>
            {currency + ' ' + getSymbolFromCurrency(currency)}
          </Typography>
          <KeyboardArrowDownIcon
            fontSize='small'
            sx={{ color: sharedColors.white }}
          />
        </Box>
        <Popover
          open={!!currencyAnchor}
          anchorEl={currencyAnchor}
          onClose={() => setCurrencyAnchor(null)}
          disableScrollLock
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ mt: 2.5 }}
        >
          <Box
            component='div'
            sx={{
              width: 160,
              display: 'flex',
              flexDirection: 'column',
              p: 0.5,
            }}
          >
            {[Currency.TRY, Currency.EUR, Currency.USD].map((curr) => (
              <Button
                onClick={() => handleChangeCurrency(curr)}
                sx={{
                  textTransform: 'none',
                  textAlign: 'left',
                  justifyContent: 'left',
                  fontSize: '13px',
                  fontWeight: 500,
                  color:
                    curr === currency
                      ? sharedColors.orange1
                      : sharedColors.black,
                }}
              >
                {curr + ' ' + getSymbolFromCurrency(curr)}
              </Button>
            ))}
          </Box>
        </Popover>
        <Box component='div' sx={{ flexGrow: 1 }} />
        <Button
          sx={{
            ...optionButtonStyle,
            mr: 1.5,
          }}
        >
          {t('app_header.sign_in')}
        </Button>
        <Button sx={optionButtonStyle}>{t('app_header.contact_us')}</Button>
      </Box>
    </Box>
  );
};

export default AppHeader;
