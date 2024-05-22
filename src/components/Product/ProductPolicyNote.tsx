import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface ProductPolicyNoteProps {
  icon: JSX.Element;
  title: string;
}

const ProductPolicyNote = (props: ProductPolicyNoteProps) => {
  const { t } = useTranslation();

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        border: '1px solid rgba(0, 0, 0, .25)',
        padding: '1rem 1.5rem',
        alignItems: 'center',
      }}
    >
      {props.icon}
      <Box
        component='div'
        sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}
      >
        <Typography sx={{ fontWeight: 400, fontSize: '.9375rem' }}>
          {props.title}
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: '.9375rem' }}>
          {t('product.edit_policy_note')}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductPolicyNote;
