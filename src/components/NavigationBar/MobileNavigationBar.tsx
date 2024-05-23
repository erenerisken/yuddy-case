import { useRecoilState, useRecoilValue } from 'recoil';
import { showNavigationBarAtom } from '../../atoms/NavigationBar';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Popover,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sharedColors } from '../../utils/Style';
import { categoriesAtom } from '../../atoms/Category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { currencyAtom } from '../../atoms/Currency';
import { Currency } from '../../interfaces/Currency';
import getSymbolFromCurrency from 'currency-symbol-map';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getLanguageName, getStoredLanguage } from '../../utils/Language';
import { Language } from '../../interfaces/Language';

const MobileNavigationBar = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const categories = useRecoilValue(categoriesAtom);
  const [currency, setCurrency] = useRecoilState(currencyAtom);
  const showNavigationBar = useRecoilValue(showNavigationBarAtom);

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

  const buttonStyle = {
    justifyContent: 'left',
    color: sharedColors.black,
    fontWeight: 600,
    fontSize: '16px',
    transition: '0.5s',
    '&:hover': {
      color: sharedColors.orange1,
    },
  };

  const dropdownLabelStyle = {
    color: sharedColors.black,
    fontSize: '13px',
    fontWeight: 500,
  };

  return showNavigationBar ? (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        py: 1.5,
        px: 2.5,
      }}
    >
      <Button onClick={() => navigate('/')} sx={buttonStyle}>
        {t('navigation_bar.home')}
      </Button>
      {categories.map((topCategory) =>
        isEmpty(topCategory.subcategories) ? (
          <Button
            onClick={() => navigate(`/category/${topCategory.id}`)}
            sx={buttonStyle}
          >
            {topCategory.name}
          </Button>
        ) : (
          <Accordion
            elevation={0}
            sx={{
              ml: -1,
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                onClick={() => navigate(`/category/${topCategory.id}`)}
                sx={{
                  color: sharedColors.black,
                  fontWeight: 600,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  transition: '0.5s',
                  '&:hover': {
                    color: sharedColors.orange1,
                  },
                }}
              >
                {topCategory.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {topCategory.subcategories.map((category) =>
                isEmpty(category.subcategories) ? (
                  <Button
                    onClick={() => navigate(`/category/${category.id}`)}
                    sx={{
                      color: sharedColors.gray8,
                      fontWeight: 700,
                      fontSize: '14px',
                      transition: '0.5s',
                      textTransform: 'none',
                      '&:hover': {
                        color: sharedColors.orange1,
                      },
                    }}
                  >
                    {category.name}
                  </Button>
                ) : (
                  <Accordion
                    elevation={0}
                    sx={{
                      ml: -1,
                      '&:before': {
                        display: 'none',
                      },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        onClick={() => navigate(`/category/${category.id}`)}
                        sx={{
                          color: sharedColors.gray8,
                          fontWeight: 700,
                          fontSize: '14px',
                          transition: '0.5s',
                          '&:hover': {
                            color: sharedColors.orange1,
                          },
                        }}
                      >
                        {category.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        component='div'
                        sx={{
                          display: 'flex',
                          flexGrow: 1,
                          flexDirection: 'column',
                        }}
                      >
                        {category.subcategories.map((subcategory) => (
                          <Button
                            onClick={() =>
                              navigate(`/category/${subcategory.id}`)
                            }
                            sx={{
                              color: sharedColors.gray8,
                              fontWeight: 700,
                              fontSize: '14px',
                              transition: '0.5s',
                              textTransform: 'none',
                              justifyContent: 'left',
                              '&:hover': {
                                color: sharedColors.orange1,
                              },
                            }}
                          >
                            {subcategory.name}
                          </Button>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ),
              )}
            </AccordionDetails>
          </Accordion>
        ),
      )}
      <Button onClick={() => navigate('/')} sx={buttonStyle}>
        {t('navigation_bar.contact_us')}
      </Button>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          mt: 2,
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ color: sharedColors.gray2, fontWeight: 500, fontSize: '13px' }}
        >
          {t('top_menu.currency')}
        </Typography>
        <Box
          component='div'
          onClick={(e) => setCurrencyAnchor(e.currentTarget)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            mt: 0.2,
            ml: 1,
          }}
        >
          <Typography sx={{ ...dropdownLabelStyle }}>
            {currency + ' ' + getSymbolFromCurrency(currency)}
          </Typography>
          <KeyboardArrowDownIcon
            fontSize='small'
            sx={{ color: sharedColors.black }}
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
      </Box>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          mt: 2,
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ color: sharedColors.gray2, fontWeight: 500, fontSize: '13px' }}
        >
          {t('top_menu.language')}
        </Typography>
        <Box
          component='div'
          onClick={(e) => setLanguageAnchor(e.currentTarget)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            ml: 1,
          }}
        >
          <Typography sx={{ ...dropdownLabelStyle }}>
            {getLanguageName(selectedLanguage)}
          </Typography>
          <KeyboardArrowDownIcon
            fontSize='small'
            sx={{ color: sharedColors.black }}
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
      </Box>
      <Button
        onClick={() => navigate('/')}
        sx={{
          color: sharedColors.gray2,
          fontWeight: 500,
          fontSize: '13px',
          justifyContent: 'left',
          textTransform: 'none',
          p: 0,
          minWidth: 0,
          mt: 2.5,
        }}
      >
        {t('top_menu.contact_us')}
      </Button>
    </Box>
  ) : (
    <></>
  );
};

export default MobileNavigationBar;
