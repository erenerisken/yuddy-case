import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '../../atoms/Category';
import { Box, Button, Popover } from '@mui/material';
import { sharedColors, sharedStyles } from '../../utils/Style';
import React, { useRef, useState } from 'react';
import CategoryPopover from './CategoryPopover';
import { Category } from '../../interfaces/Category';
import { isEmpty } from 'lodash';

const NavigationBar = () => {
  const { t } = useTranslation();

  const categories = useRecoilValue(categoriesAtom);

  const [categoryAnchor, setCategoryAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const isHoveringRef = useRef(false);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    category: Category,
  ) => {
    setCategoryAnchor(e.currentTarget);
    setHoveredCategory(category);
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    setTimeout(() => {
      if (!isHoveringRef.current) {
        setCategoryAnchor(null);
      }
    }, 100);
  };

  const buttonStyle = {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: sharedColors.white,
    py: 1.75,
    px: 2.5,
    '&:hover': {
      color: sharedColors.black,
    },
  };

  return (
    <Box
      component='div'
      sx={{
        backgroundColor: sharedColors.orange1,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Box component='div' sx={sharedStyles.horizontalSpan}>
        <Button sx={buttonStyle}>{t('navigation_bar.home')}</Button>
        {categories.map((category) => (
          <Button
            onMouseEnter={(e) => handleMouseEnter(e, category)}
            onMouseLeave={handleMouseLeave}
            sx={buttonStyle}
          >
            {category.name}
          </Button>
        ))}
        <Button sx={buttonStyle}>{t('navigation_bar.contact_us')}</Button>
        <Popover
          open={!!categoryAnchor && !isEmpty(hoveredCategory?.subcategories)}
          anchorEl={categoryAnchor}
          disableScrollLock
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          disableRestoreFocus
          sx={{
            pointerEvents: 'none',
          }}
        >
          <Box
            component='div'
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            onMouseLeave={handleMouseLeave}
            sx={{
              pointerEvents: 'auto',
            }}
          >
            {!!hoveredCategory && (
              <CategoryPopover category={hoveredCategory} />
            )}
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default NavigationBar;
