import { Box } from '@mui/material';
import SearchTextField from './SearchTextField';
import { sharedColors } from '../../utils/Style';

const MobileSearchField = () => {
  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexGrow: 1,
        px: 2.5,
        py: 2,
        backgroundColor: sharedColors.gray7,
      }}
    >
      <SearchTextField width='100%' />
    </Box>
  );
};

export default MobileSearchField;
