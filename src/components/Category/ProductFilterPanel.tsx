import { Brand } from '../../interfaces/Brand';
import { ProductFilter } from '../../interfaces/ProductFilter';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { cloneDeep } from 'lodash';

interface ProductFilterPanelProps {
  brands: Brand[];
  filters: ProductFilter;
  onChange: (newFilters: ProductFilter) => void;
}

const ProductFilterPanel = (props: ProductFilterPanelProps) => {
  const { t } = useTranslation();

  const handleToggleBrand = (brandID: number) => {
    const newBrandIDs = cloneDeep(props.filters.brandIDs);
    const index = newBrandIDs.indexOf(brandID);
    if (index > -1) {
      newBrandIDs.splice(index, 1);
    } else {
      newBrandIDs.push(brandID);
    }

    props.onChange({
      ...props.filters,
      brandIDs: newBrandIDs,
      pagination: { ...props.filters.pagination, pageNumber: 1 },
    });
  };

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography
        sx={{
          m: 2,
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '14px',
        }}
      >
        {t('category.filter_by')}
      </Typography>
      <Divider />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            {t('category.brand')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component='div'
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {props.brands.map((brand) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.filters.brandIDs.includes(brand.id)}
                    onChange={() => handleToggleBrand(brand.id)}
                  />
                }
                label={<Typography>{brand.name}</Typography>}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ProductFilterPanel;
