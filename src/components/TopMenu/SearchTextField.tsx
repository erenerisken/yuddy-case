import { InputAdornment, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { sharedColors } from '../../utils/Style';

interface SearchTextFieldProps {
  width: number | string;
}

const SearchTextField = (props: SearchTextFieldProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      variant='outlined'
      size='small'
      placeholder={t('top_menu.search')}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon
              sx={{
                color: sharedColors.gray4,
                cursor: 'pointer',
              }}
            />
          </InputAdornment>
        ),
      }}
      sx={{ width: props.width, backgroundColor: sharedColors.white }}
    />
  );
};

export default SearchTextField;
