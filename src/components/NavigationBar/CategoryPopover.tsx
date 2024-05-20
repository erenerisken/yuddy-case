import { Category } from '../../interfaces/Category';
import { Box, Button, Grid } from '@mui/material';
import { sharedColors } from '../../utils/Style';
import { isEmpty } from 'lodash';

interface CategoryPopoverProps {
  category: Category;
}

const CategoryPopover = (props: CategoryPopoverProps) => {
  console.log(props.category);
  return (
    <Box component='div' sx={{ px: 2.5, py: 1.5 }}>
      <Grid container spacing={1.5}>
        {props.category.subcategories.map((category) => (
          <Grid item xs={6} sm={4} md={3} sx={{ minWidth: 160 }}>
            <Box
              component='div'
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Button
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  minHeight: 0,
                  p: 0,
                  m: 0,
                  color: sharedColors.gray1,
                  '&:hover': {
                    color: sharedColors.orange1,
                  },
                  textAlign: 'left',
                  justifyContent: 'left',
                }}
              >
                {category.name}
              </Button>
              {!isEmpty(category.subcategories) && (
                <Box
                  component='div'
                  sx={{ mt: 0.5, display: 'flex', flexDirection: 'column' }}
                >
                  {category.subcategories.map((subcategory) => (
                    <Button
                      sx={{
                        textTransform: 'none',
                        fontWeight: 400,
                        fontSize: '14px',
                        minHeight: 0,
                        p: 0,
                        m: 0,
                        color: sharedColors.gray1,
                        '&:hover': {
                          color: sharedColors.orange1,
                        },
                        textAlign: 'left',
                        justifyContent: 'left',
                      }}
                    >
                      {subcategory.name}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryPopover;
